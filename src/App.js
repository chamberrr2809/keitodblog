import MiniDrawer from "./pages/DashboardHome";
import DashboardManageBlogs from "./pages/DashboardManageBlogs";
import { Routes, Route } from "react-router-dom";
import DashboardProfile from "./pages/DashboardProfile";
import DashboardNewBlog from "./pages/DashboardNewBlog";
import DashboardEditBlog from "./pages/DashboardEditBlog";
import HomepageBlog from "./pages/HomepageBlog";
import SingleBlog from "./pages/SingleBlog";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomepageBlog />} />
        <Route path="/dashboard/home" element={<MiniDrawer />} />
        <Route path="/dashboard/blogs" element={<DashboardManageBlogs />} />
        <Route path="/dashboard/profile" element={<DashboardProfile />} />
        <Route path="/dashboard/blogs/new" element={<DashboardNewBlog />} />
        <Route
          path="/dashboard/blogs/:slug/edit"
          element={<DashboardEditBlog />}
        />
        <Route path="/blog/:slug" element={<SingleBlog />} />
      </Routes>
    </main>
  );
}
