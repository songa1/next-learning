export default async function DocSlug({ params }) {
  const slug = await params;
  console.log(slug);
  for (let s of slug.slug) {
    console.log(s);
  }
  return <h1>DOC DETAILS</h1>;
}
