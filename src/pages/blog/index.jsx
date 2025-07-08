import React from "react";
import BlogComponents from "../../components/blog";

function Blog() {
  return (
    <section className="w-[90%] m-auto mt-[20px]">
      <div className="flex flex-col gap-[40px]">
        <h1 className="text-center text-[29px] font-bold">Blog</h1>
      </div>

      <div>
        <BlogComponents />
      </div>
    </section>
  );
}

export default Blog;
