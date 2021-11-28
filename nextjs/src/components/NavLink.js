import { useRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

const getActiveClassName = (pathname, href, exact) => {
  if (exact) {
    if (pathname === href) return "selected";
    return "";
  }
  if (pathname.includes(href)) return "selected";
  return "";
};

const NavLink = ({ children, exact, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || "";

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const className = `${childClassName} ${getActiveClassName(asPath, props.href, exact)}`.trim();

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default NavLink;
