-- Form submissions now go through server functions that verify reCAPTCHA and insert with the
-- service role. Remove direct anonymous inserts so bots can't bypass the captcha via the public key.
DROP POLICY IF EXISTS "Anyone can send a contact message" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can submit a wholesale inquiry" ON public.wholesale_inquiries;
DROP POLICY IF EXISTS "Anyone can submit a quote request" ON public.quote_requests;
REVOKE INSERT ON public.contact_messages FROM anon;
REVOKE INSERT ON public.wholesale_inquiries FROM anon;
REVOKE INSERT ON public.quote_requests FROM anon;
