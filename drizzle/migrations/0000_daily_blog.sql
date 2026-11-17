CREATE TABLE public.blog_posts (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, title text NOT NULL, excerpt text NOT NULL, category text NOT NULL, sections jsonb NOT NULL DEFAULT '[]', sources jsonb NOT NULL DEFAULT '[]', published_at timestamptz NOT NULL DEFAULT now(), publication_day date NOT NULL UNIQUE, image_key text NOT NULL DEFAULT 'hair', generated boolean NOT NULL DEFAULT false);
GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published articles are public" ON public.blog_posts FOR SELECT TO anon, authenticated USING (published_at <= now());
CREATE TABLE public.blog_job_state (name text PRIMARY KEY, status text NOT NULL DEFAULT 'active', pause_reason text, lease_token uuid, lease_until timestamptz, last_attempt_day date, last_success_day date, updated_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.blog_job_state TO service_role;
ALTER TABLE public.blog_job_state ENABLE ROW LEVEL SECURITY;
CREATE OR REPLACE FUNCTION public.acquire_blog_lease(p_day date, p_token uuid) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$ BEGIN
INSERT INTO public.blog_job_state(name) VALUES ('daily-blog') ON CONFLICT DO NOTHING;
UPDATE public.blog_job_state SET lease_token=p_token, lease_until=now()+interval '15 minutes', last_attempt_day=p_day, updated_at=now() WHERE name='daily-blog' AND status='active' AND (lease_until IS NULL OR lease_until<now()) AND last_attempt_day IS DISTINCT FROM p_day AND NOT EXISTS(SELECT 1 FROM public.blog_posts WHERE publication_day=p_day);
RETURN FOUND; END; $$;
REVOKE ALL ON FUNCTION public.acquire_blog_lease(date,uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.acquire_blog_lease(date,uuid) TO service_role;
CREATE OR REPLACE FUNCTION public.finish_blog_post(p_token uuid, p_day date, p_post jsonb) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$ BEGIN
PERFORM 1 FROM public.blog_job_state WHERE name='daily-blog' AND lease_token=p_token AND status='active' FOR UPDATE;
IF NOT FOUND THEN RETURN false; END IF;
INSERT INTO public.blog_posts(slug,title,excerpt,category,sections,sources,publication_day,image_key,generated) VALUES(p_post->>'slug',p_post->>'title',p_post->>'excerpt',p_post->>'category',p_post->'sections',p_post->'sources',p_day,p_post->>'image_key',true) ON CONFLICT (publication_day) DO NOTHING;
UPDATE public.blog_job_state SET lease_token=NULL,lease_until=NULL,last_success_day=p_day,updated_at=now() WHERE name='daily-blog' AND lease_token=p_token;
RETURN true; END; $$;
REVOKE ALL ON FUNCTION public.finish_blog_post(uuid,date,jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.finish_blog_post(uuid,date,jsonb) TO service_role;