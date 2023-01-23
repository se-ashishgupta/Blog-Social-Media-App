import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  AddCircle,
  AddCircleOutline,
  AccountCircle,
  AccountCircleOutlined,
  CollectionsBookmark,
  CollectionsBookmarkOutlined,
} from "@mui/icons-material";

const Header = () => {
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="header">
      <Link to="/" onClick={() => setTab("/")}>
        {tab === "/" ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
      </Link>
      <Link to="/newblog" onClick={() => setTab("/newblog")}>
        {tab === "/newblog" ? (
          <>
            <AddCircle style={{ color: "black" }} />
          </>
        ) : (
          <AddCircleOutline />
        )}
      </Link>
      <Link to="/myblogs" onClick={() => setTab("/myblogs")}>
        {tab === "/myblogs" ? (
          <CollectionsBookmark style={{ color: "black" }} />
        ) : (
          <CollectionsBookmarkOutlined />
        )}
      </Link>
      <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? (
          <AccountCircle style={{ color: "black" }} />
        ) : (
          <AccountCircleOutlined />
        )}
      </Link>
    </div>
  );
};

export default Header;
