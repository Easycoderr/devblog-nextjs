"use client";
function FooterCopyRight() {
  const year = new Date().getFullYear();
  return (
    <div className="text-sm mx-auto text-muted-foreground">
      &copy; <span>{year}</span> DevBlog. All rights reserved.
    </div>
  );
}

export default FooterCopyRight;
