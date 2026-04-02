

export default async function BlogDetails({ params }) {
  const { id } = await params;

  return <h1>Blog Details for {id}</h1>;
}
 