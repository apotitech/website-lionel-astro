const blogsImportResult = import.meta.glob('../content/blog/*.mdx', {
  eager: true,
});
const blogs = Object.values(blogsImportResult);
const uniqueTags = [
  ...new Set(blogs.map(blog => blog.frontmatter.tags).flat()),
];

export const get = () => {
  return {
    body: `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.softwaresennin.dev/</loc></url>
  <url><loc>https://www.softwaresennin.dev/blog</loc></url>
  <url><loc>https://www.softwaresennin.dev/contact</loc></url>
  <url><loc>https://www.softwaresennin.dev/cv</loc></url>
  <url><loc>https://www.softwaresennin.dev/personal</loc></url>
  <url><loc>https://www.softwaresennin.dev/portfolio</loc></url>
    ${blogs
      .map(
        blog => `<url>
    <loc>https://www.softwaresennin.dev${blog.url
      .replace('src/content', '')
      .replace('.mdx', '')}</loc>
  </url>`
      )
      .join('')}
          ${uniqueTags
            .map(
              tag => `<url>
    <loc>https://www.softwaresennin.dev/blog/tags/${tag}</loc>
  </url>`
            )
            .join('')}
  </urlset>`,
  };
};
