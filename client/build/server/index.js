import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, Link, useLocation } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Footer() {
  return /* @__PURE__ */ jsx("div", { className: "h-[155.09px] bg-[#1a1d24] text-white text-medium format", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center", children: [
    /* @__PURE__ */ jsx("ul", { className: "social-icons flex items-center gap-4 mt-4 h-[44px] text-[16.5px]", children: socialMedia$1.map((item) => /* @__PURE__ */ jsx("li", { className: "social-icon-item font-bold", children: /* @__PURE__ */ jsxs(Link, { to: item.url, target: "_blank", rel: "noopener noreferrer", children: [
      item.icon,
      " ",
      /* @__PURE__ */ jsx("span", { className: "ml-1.5 hover:underline", children: item.name })
    ] }) }, item.name)) }),
    /* @__PURE__ */ jsx("div", { className: "footer-copyright text-[14px] mt-4", children: "© 2025 (mammon). Powered by Mammon" })
  ] }) });
}
const socialMedia$1 = [
  {
    name: "Facebook",
    icon: /* @__PURE__ */ jsx("i", { className: "fab fa-facebook-square" }),
    url: "https://www.facebook.com/trunghieu8401/"
  },
  {
    name: "GitHub",
    icon: /* @__PURE__ */ jsx("i", { className: "fab fa-github" }),
    url: "https://github.com/2Mammon2"
  },
  {
    name: "Telegram",
    icon: /* @__PURE__ */ jsx("i", { className: "fab fa-telegram" }),
    url: "https://t.me/lMAMMONl"
  }
];
const logo = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiI+CiAgPCEtLSBIw6xuaCB0csOybiBt4budIGLDqm4gbmdvw6BpIC0tPgogIDxjaXJjbGUgY3g9IjE4IiBjeT0iMTgiIHI9IjE0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4YTJiZTIiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0iMiwxIi8+CiAgCiAgPCEtLSBN4bq3dCBu4bqhIGhhY2tlciBuaOG7jyAtLT4KICA8Y2lyY2xlIGN4PSIxOCIgY3k9IjE4IiByPSIxMCIgZmlsbD0iIzE2MjEzZSIvPgogIAogIDwhLS0gTeG6r3QgLS0+CiAgPHJlY3QgeD0iMTIiIHk9IjE1IiB3aWR0aD0iNSIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iI2ZmMmU2MyIvPgogIDxyZWN0IHg9IjE5IiB5PSIxNSIgd2lkdGg9IjUiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiNmZjJlNjMiLz4KICAKICA8IS0tIE7hu6UgY8aw4budaSBow6xuaCByxINuZyBjxrBhIC0tPgogIDxwYXRoIGQ9Ik0xNCwyMSBMMTYsMjMgTDE4LDIxIEwyMCwyMyBMMjIsMjEiIHN0cm9rZT0iI2ZmMmU2MyIgc3Ryb2tlLXdpZHRoPSIxLjUiIGZpbGw9Im5vbmUiLz4KICAKICA8IS0tIEPDoWMga8O9IHThu7EgaGFja2VyIHh1bmcgcXVhbmggLS0+CiAgPHRleHQgeD0iNyIgeT0iMTIiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMiIgZmlsbD0iIzAwZmY5ZiIgdHJhbnNmb3JtPSJyb3RhdGUoLTMwLCA3LCAxMikiPiQ8L3RleHQ+CiAgPHRleHQgeD0iMjciIHk9IjEyIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjIiIGZpbGw9IiMwMGZmOWYiIHRyYW5zZm9ybT0icm90YXRlKDMwLCAyNywgMTIpIj4jPC90ZXh0PgogIDx0ZXh0IHg9IjciIHk9IjI0IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjIiIGZpbGw9IiMwMGZmOWYiIHRyYW5zZm9ybT0icm90YXRlKDMwLCA3LCAyNCkiPkA8L3RleHQ+CiAgPHRleHQgeD0iMjciIHk9IjI0IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjIiIGZpbGw9IiMwMGZmOWYiIHRyYW5zZm9ybT0icm90YXRlKC0zMCwgMjcsIDI0KSI+ITwvdGV4dD4KICAKICA8IS0tIFRhaSBuaOG7jW4vc+G7q25nIC0tPgogIDxwYXRoIGQ9Ik0xMiwxMiBMMTQsMTggTDE4LDggTDIyLDE4IEwyNCwxMiIgZmlsbD0iIzE2MjEzZSIgc3Ryb2tlPSIjOGEyYmUyIiBzdHJva2Utd2lkdGg9IjEiLz4KICAKICA8IS0tIENo4buvIE0gbmjhu48gLS0+CiAgPHBhdGggZD0iTTE0LDI2IEwxNiwzMCBMMTgsMjYgTDIwLDMwIEwyMiwyNiIgc3Ryb2tlPSIjZmYyZTYzIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4=";
function Navbar() {
  return /* @__PURE__ */ jsx("nav", { className: "h-[88.8px] border-b-2 border-b-[#51555d]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center", children: /* @__PURE__ */ jsx("img", { src: logo, alt: "Logo", className: "h-10" }) }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-[20px] font-bold ml-2", children: /* @__PURE__ */ jsx("span", { className: "text-[20px] font-bold", children: "Mammon's Blog" }) })
    ] }),
    /* @__PURE__ */ jsx(Link, { to: "/about", className: "text-[22px] hover:underline", children: "About" })
  ] }) });
}
function DefaultLayout({ children }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("main", { children }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const Loading = ({ lines }) => {
  return /* @__PURE__ */ jsx("div", { className: "p-4 space-y-2", children: Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-4 w-2/3 bg-slate-700 rounded animate-pulse" }, i)) });
};
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center space-x-1 mt-6", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handlePageChange(currentPage - 1),
        disabled: currentPage === 1,
        className: "px-3 py-1 rounded border bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50",
        children: "Previous"
      }
    ),
    pages.map((page) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handlePageChange(page),
        className: `px-3 py-1 rounded border ${page === currentPage ? "bg-cyan-500 text-white" : "bg-gray-900 text-gray-300 hover:bg-gray-700"}`,
        children: page
      },
      page
    )),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handlePageChange(currentPage + 1),
        disabled: currentPage === totalPages,
        className: "px-3 py-1 rounded border bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50",
        children: "Next"
      }
    )
  ] });
};
const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json"
  }
});
function MainContent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recentPostsRef = useRef(null);
  const POSTS_PER_PAGE = 5;
  const paginatedData = data.slice(3);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const visiblePosts = paginatedData.slice(start, end);
  const totalPages = Math.ceil((data.length - 3) / POSTS_PER_PAGE);
  useEffect(() => {
    api.get("/post").then(({ data: data2 }) => {
      setData(data2.data.posts.reverse());
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching posts:", error);
      setLoading(false);
    });
    return () => {
      setData([]);
      setLoading(true);
    };
  }, []);
  const handlePageChange = (page) => {
    var _a;
    setCurrentPage(page);
    (_a = recentPostsRef.current) == null ? void 0 : _a.scrollIntoView({
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "mt-[22px] w-3/4 ml-[50px] mb-[50px] pr-[200px] format", children: [
    /* @__PURE__ */ jsx("h1", { className: "page-title text-2xl mb-8", children: "👋 Welcome to the site!" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
      /* @__PURE__ */ jsx("b", { className: "text-[20px] border-b-2 border-[#51555d]", children: "Quick links to popular content can be found below:" }),
      /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside mt-8 ml-8", children: data && !loading ? data.slice(0, 3).map((post) => /* @__PURE__ */ jsx("li", { className: "text-[18px] mb-2", children: /* @__PURE__ */ jsx(
        Link,
        {
          to: `/post/${post._id}`,
          className: "text-[#699da0] underline hover:text-[#4a7b8c]",
          children: post.title
        }
      ) }, post._id)) : /* @__PURE__ */ jsx(Loading, { lines: 3 }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "h2",
        {
          className: "text-[20px] border-b-2 border-[#51555d] font-bold",
          ref: recentPostsRef,
          children: "Recent posts:"
        }
      ),
      /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside mt-8 ml-8 flex flex-col gap-4", children: visiblePosts && !loading ? visiblePosts.map((post) => /* @__PURE__ */ jsx("li", { className: "text-[18px] mb-2", children: /* @__PURE__ */ jsxs(Link, { to: `/post/${post._id}`, className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[#699da0] underline hover:text-[#4a7b8c] text-[26px] font-bold", children: post.title }),
        /* @__PURE__ */ jsxs("div", { className: "text-[13px] flex items-center gap-1 opacity-70", children: [
          /* @__PURE__ */ jsx("i", { className: "fa-solid fa-calendar-days" }),
          /* @__PURE__ */ jsx("span", { children: formatDate(post.createdAt) })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "line-clamp-2 text-[16px]",
            dangerouslySetInnerHTML: { __html: post.content }
          }
        )
      ] }) }, post._id)) : /* @__PURE__ */ jsx(Loading, { lines: 3 }) })
    ] }),
    /* @__PURE__ */ jsx(
      Pagination,
      {
        currentPage,
        totalPages,
        onPageChange: handlePageChange
      }
    )
  ] });
}
function Sidebar() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex w-1/4 format", children: /* @__PURE__ */ jsx("div", { className: "mt-[22px] sticky top-6 self-start h-fit", children: /* @__PURE__ */ jsxs("div", { className: "w-fit", children: [
    /* @__PURE__ */ jsx("div", { className: "author__avatar", children: /* @__PURE__ */ jsx("img", { src: logo, alt: "Logo", className: "h-25" }) }),
    /* @__PURE__ */ jsx("div", { className: "author-name mt-[10px]", children: /* @__PURE__ */ jsx("h3", { className: "text-[22px] text-[#eaeaea]", children: "R.B.C (g3tsyst3m)" }) }),
    /* @__PURE__ */ jsx("div", { className: "author-description mt-[10px] mb-[20px]", children: /* @__PURE__ */ jsx("h3", { className: "text-[16.5px] mt-[10px] text-[#eaeaea]", children: "Super passionate about Infosec…Dwight Schrute level of intensity" }) }),
    /* @__PURE__ */ jsx("ul", { className: "social-icons flex flex-col gap-2 text-[16.5px]", children: socialMedia.map((item) => /* @__PURE__ */ jsx("li", { className: "social-icon-item", children: /* @__PURE__ */ jsxs(Link, { to: item.url, target: "_blank", rel: "noopener noreferrer", children: [
      item.icon,
      " ",
      /* @__PURE__ */ jsx("span", { className: "ml-1.5 hover:underline", children: item.name })
    ] }) }, item.name)) })
  ] }) }) });
}
const socialMedia = [
  {
    name: "Email",
    icon: /* @__PURE__ */ jsx("i", { className: "fa-solid fa-inbox" }),
    url: "mailto:nguyentrunghieu842001@gmail.com"
  },
  {
    name: "Website",
    icon: /* @__PURE__ */ jsx("i", { className: "fa-solid fa-link" }),
    url: "https://mammon.github.io/"
  },
  {
    name: "Facebook",
    icon: /* @__PURE__ */ jsx("i", { className: "fab fa-facebook-square" }),
    url: "https://www.facebook.com/trunghieu8401/"
  },
  {
    name: "GitHub",
    icon: /* @__PURE__ */ jsx("i", { className: "fab fa-github" }),
    url: "https://github.com/2Mammon2"
  },
  {
    name: "Telegram",
    icon: /* @__PURE__ */ jsx("i", { className: "fab fa-telegram" }),
    url: "https://t.me/lMAMMONl"
  }
];
function Welcome() {
  return /* @__PURE__ */ jsx(DefaultLayout, { children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ jsx(Sidebar, {}),
    /* @__PURE__ */ jsx(MainContent, {})
  ] }) });
}
function meta$6({}) {
  return [{
    title: "Mammon's Blog | Home"
  }, {
    name: "description",
    content: "Security Researcher and Enthusiast. I’m fairly low profile, but share useful info from time to time. Red Team wannabe"
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
const aboutImage = "/assets/about-image-DX01XyGU.png";
function meta$5({}) {
  return [{
    title: "Mammon's Blog | About"
  }, {
    name: "description",
    content: "Security Researcher and Enthusiast. I’m fairly low profile, but share useful info from time to time. Red Team wannabe"
  }];
}
const About = withComponentProps(function About2() {
  return /* @__PURE__ */ jsx(DefaultLayout, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex",
      children: [/* @__PURE__ */ jsx(Sidebar, {}), /* @__PURE__ */ jsxs("div", {
        className: "mt-[22px] w-3/4 ml-[50px] mb-[50px] pr-[200px]",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex justify-center mb-4",
          children: /* @__PURE__ */ jsx("img", {
            src: aboutImage,
            alt: "aboutImage",
            className: "w-[477px] h-[477px]"
          })
        }), /* @__PURE__ */ jsx("p", {
          className: "mb-[20px]",
          children: "I am a passionate person and I am quite private. I just graduated in April 2025 and I have a CCNA certification, studied through CEHv12. My abilities are focused on pentest tools. I like reverse engineering, pentesting. I will always try to learn as much as possible around every aspect of Information Security. Thanks everyone 😸"
        }), /* @__PURE__ */ jsx("p", {
          className: "mb-[20px]",
          children: "I hope my contributions can help everyone improve their knowledge about every aspect of offensive security. I will focus mainly on offensive security tools. Finally, I also want to share detailed tutorials, analysis of tools and concepts shared in all posts. I think everything will come in time 😸"
        }), /* @__PURE__ */ jsxs("p", {
          className: "mb-[20px]",
          children: ["You can find me on Telegram:", " ", /* @__PURE__ */ jsx(Link, {
            to: "https://t.me/lMAMMONl",
            target: "_blank",
            rel: "noopener noreferrer",
            children: /* @__PURE__ */ jsx("span", {
              className: "ml-1.5 underline",
              children: "lMAMMONl"
            })
          })]
        })]
      })]
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: About,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function meta$4({}) {
  return [{
    title: "Mammon's Blog | Post"
  }, {
    name: "description",
    content: "Security Researcher and Enthusiast. I’m fairly low profile, but share useful info from time to time. Red Team wannabe"
  }];
}
const AboutDetail = () => {
  const {
    id
  } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`/post/${id}`).then(({
      data: data2
    }) => {
      setData(data2.data.post);
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching posts:", error);
      setLoading(false);
    });
    return () => {
      setData(null);
      setLoading(true);
    };
  }, [id, setData, setLoading]);
  if (!data) return /* @__PURE__ */ jsx(DefaultLayout, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex",
      children: [/* @__PURE__ */ jsx(Sidebar, {}), /* @__PURE__ */ jsx("div", {
        className: "mt-[22px] w-3/4 ml-[50px] mb-[50px] flex flex-col gap-2 pr-[200px]",
        children: /* @__PURE__ */ jsx("h1", {
          className: "page-title text-[26px] font-bold",
          children: "Loading..."
        })
      })]
    })
  });
  return /* @__PURE__ */ jsx(DefaultLayout, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex",
      children: [/* @__PURE__ */ jsx(Sidebar, {}), !loading && /* @__PURE__ */ jsxs("div", {
        className: "mt-[22px] w-3/4 ml-[50px] mb-[50px] flex flex-col gap-2 pr-[200px]",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "page-title text-[26px] font-bold",
          children: data.title
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-[14px] mb-4 flex items-center gap-2",
          children: [/* @__PURE__ */ jsx("i", {
            className: "fa-solid fa-calendar-days"
          }), /* @__PURE__ */ jsx("span", {
            children: formatDate(data.createdAt)
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "prose dark:prose-invert max-w-none flex flex-col gap-3",
          dangerouslySetInnerHTML: {
            __html: data.content
          }
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-2 text-sm text-white mt-16",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-start gap-2",
            children: [/* @__PURE__ */ jsx("i", {
              className: "fa-solid fa-tags"
            }), /* @__PURE__ */ jsx("span", {
              className: "flex items-center gap-1 font-semibold",
              children: "Tags:"
            }), /* @__PURE__ */ jsx("div", {
              className: "flex flex-wrap gap-2",
              children: data.tag.map((t, i) => /* @__PURE__ */ jsx(Link, {
                to: `/tags/#${t.replaceAll(" ", "-")}`,
                className: "px-2 py-0.5 border border-white rounded hover:bg-white hover:text-black transition",
                children: t
              }, i))
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-start gap-2",
            children: [/* @__PURE__ */ jsx("i", {
              className: "fa-solid fa-folder-open"
            }), /* @__PURE__ */ jsx("span", {
              className: "flex items-center gap-1 font-semibold",
              children: "Categories:"
            }), /* @__PURE__ */ jsx("div", {
              className: "flex flex-wrap gap-2",
              children: data.category.map((c, i) => /* @__PURE__ */ jsx(Link, {
                to: `/categories/#${c.replaceAll("%20", "-")}`,
                className: "px-2 py-0.5 border border-white rounded hover:bg-white hover:text-black transition",
                children: c
              }, i))
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [/* @__PURE__ */ jsx("i", {
              className: "fa-solid fa-calendar-days"
            }), /* @__PURE__ */ jsx("span", {
              className: "font-semibold",
              children: "Updated:"
            }), /* @__PURE__ */ jsx("span", {
              children: new Date(data.updatedAt).toLocaleDateString("en-US", {
                dateStyle: "long"
              })
            })]
          })]
        })]
      })]
    })
  });
};
const AboutDetail$1 = withComponentProps(AboutDetail);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AboutDetail$1,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function RichTextEditor({
  content,
  setContent
}) {
  return /* @__PURE__ */ jsx(
    Editor,
    {
      apiKey: "loyjdbz9liml36pag0kmbd0yrtomxak1dsqxayw7mahktd4f",
      value: content,
      onEditorChange: (newContent) => setContent(newContent),
      init: {
        height: 600,
        menubar: "file edit view insert format tools table help",
        toolbar_mode: "wrap",
        valid_elements: "*[*]",
        extended_valid_elements: "*[*]",
        plugins: "advlist autolink link image lists charmap preview anchor searchreplace visualblocks visualchars code fullscreen insertdatetime media table codesample help wordcount emoticons directionality nonbreaking pagebreak save autosave quickbars importcss",
        toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist checklist | link image media table | charmap emoticons pagebreak codesample | removeformat subscript superscript | visualblocks visualchars code fullscreen preview | insertdatetime save",
        toolbar_sticky: true,
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        quickbars_insert_toolbar: false,
        // Optional if using full toolbar
        quickbars_selection_toolbar: false
      }
    }
  );
}
function TagInput({ label, tag, setTag }) {
  const [input, setInput] = useState("");
  const handleAdd = () => {
    const newTag = input.trim();
    if (newTag && !tag.includes(newTag)) {
      setTag([...tag, newTag]);
    }
    setInput("");
  };
  const handleRemove = (tagToRemove) => {
    setTag(tag.filter((tag2) => tag2 !== tagToRemove));
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-1/2", children: [
    /* @__PURE__ */ jsx("label", { className: "block mb-1 font-medium", children: label }),
    /* @__PURE__ */ jsx("div", { className: "flex space-x-2", children: /* @__PURE__ */ jsx(
      "input",
      {
        value: input,
        onChange: (e) => setInput(e.target.value),
        onKeyDown: handleKeyDown,
        className: "border-[#4a5565] border-[1px] p-2 rounded w-full bg-[#101828] focus:border-[#2b7fff] focus:border-[3px] focus:outline-none",
        placeholder: "Type and press Enter"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap mt-2 gap-2", children: tag.map((tag2, i) => /* @__PURE__ */ jsxs(
      "span",
      {
        className: "flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded",
        children: [
          tag2,
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "ml-2 text-red-500 hover:text-red-700",
              onClick: () => handleRemove(tag2),
              children: "×"
            }
          )
        ]
      },
      tag2 + i
    )) })
  ] });
}
function meta$3({}) {
  return [{
    title: "Mammon's Blog | Create post"
  }, {
    name: "description",
    content: "Security Researcher and Enthusiast. I’m fairly low profile, but share useful info from time to time. Red Team wannabe"
  }];
}
const Admin = () => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState([]);
  const [category, setCategory] = useState([]);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      api.post("/post", {
        title,
        content,
        tag,
        category
      });
      setMessage("✅ Post created successfully!");
      setTitle("");
      setTag([]);
      setCategory([]);
      setContent("");
      scrollTo(0, 0);
      setTimeout(() => setMessage(""), 3e3);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create post.");
      setTimeout(() => setMessage(""), 3e3);
    }
  };
  return /* @__PURE__ */ jsx(DefaultLayout, {
    children: /* @__PURE__ */ jsxs("form", {
      onSubmit: handleSubmit,
      className: "space-y-6 p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-6xl mx-auto",
      children: [message && /* @__PURE__ */ jsx("div", {
        className: "p-2 rounded text-sm font-medium text-white bg-green-600",
        children: message
      }), /* @__PURE__ */ jsx("h2", {
        className: "text-2xl font-bold",
        children: "Create new post"
      }), /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("label", {
          className: "block mb-1 font-semibold",
          children: "Title"
        }), /* @__PURE__ */ jsx("input", {
          name: "title",
          value: title,
          onChange: (e) => setTitle(e.target.value),
          className: "w-full px-4 py-2 border border-gray-600 rounded bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500",
          placeholder: "Post title",
          required: true
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex gap-10",
        children: [/* @__PURE__ */ jsx(TagInput, {
          label: "Tag",
          tag,
          setTag
        }), /* @__PURE__ */ jsx(TagInput, {
          label: "Category",
          tag: category,
          setTag: setCategory
        })]
      }), /* @__PURE__ */ jsx(RichTextEditor, {
        content,
        setContent
      }), /* @__PURE__ */ jsx("button", {
        type: "submit",
        className: "w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200",
        children: "Submit"
      })]
    })
  });
};
const Admin$1 = withComponentProps(Admin);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Admin$1,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function meta$2({}) {
  return [{
    title: "Mammon's Blog | Update post"
  }, {
    name: "description",
    content: "Security Researcher and Enthusiast. I’m fairly low profile, but share useful info from time to time. Red Team wannabe"
  }];
}
const AdminPUT = () => {
  const {
    id
  } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    api.get(`/post/${id}`).then(({
      data
    }) => {
      setTitle(data.data.post.title);
      setContent(data.data.post.content);
      setTag(data.data.post.tag);
      setCategory(data.data.post.category);
    }).catch((error) => {
      console.error("Error fetching posts:", error);
    }).finally(() => {
      setLoading(false);
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/post/${id}`, {
        title,
        content,
        tag,
        category
      });
      console.log({
        title,
        content,
        tag,
        category
      });
      setMessage({
        text: "✅ Post updated successfully!",
        isError: false
      });
      scrollTo(0, 0);
      setTimeout(() => setMessage(null), 3e3);
    } catch (err) {
      console.error(err);
      setMessage({
        text: "❌ Failed to update post.",
        isError: true
      });
      setTimeout(() => setMessage(null), 3e3);
    }
  };
  return /* @__PURE__ */ jsx(DefaultLayout, {
    children: !loading ? /* @__PURE__ */ jsxs("form", {
      onSubmit: handleSubmit,
      className: "space-y-6 p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-6xl mx-auto",
      children: [message && /* @__PURE__ */ jsx("div", {
        className: `p-2 rounded text-sm font-medium text-white ${message.isError ? "bg-red-600" : "bg-green-600"}`,
        children: message.text
      }), /* @__PURE__ */ jsxs("h2", {
        className: "text-2xl font-bold",
        children: ["Update post - ID: ", id]
      }), /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("label", {
          className: "block mb-1 font-semibold",
          children: "Title"
        }), /* @__PURE__ */ jsx("input", {
          name: "title",
          value: title,
          onChange: (e) => setTitle(e.target.value),
          className: "w-full px-4 py-2 border border-gray-600 rounded bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500",
          placeholder: "Post title",
          required: true
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex gap-10",
        children: [/* @__PURE__ */ jsx(TagInput, {
          label: "Tag",
          tag,
          setTag
        }), /* @__PURE__ */ jsx(TagInput, {
          label: "Category",
          tag: category,
          setTag: setCategory
        })]
      }), /* @__PURE__ */ jsx(RichTextEditor, {
        content,
        setContent
      }), /* @__PURE__ */ jsx("button", {
        type: "submit",
        className: "w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200",
        children: "Submit"
      })]
    }) : /* @__PURE__ */ jsx("h1", {
      className: "page-title text-[26px] font-bold",
      children: "Loading..."
    })
  });
};
const AdminPUT$1 = withComponentProps(AdminPUT);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminPUT$1,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const AdminDELETE = () => {
  const {
    id
  } = useParams();
  const [message, setMessage] = useState("");
  useEffect(() => {
    api.delete(`post/${id}`).then((res) => setMessage("✅ Post deleted successfully!"));
  }, []);
  return /* @__PURE__ */ jsx(DefaultLayout, {
    children: /* @__PURE__ */ jsx("div", {
      className: "mt-[22px] mb-[50px] text-center text-[40px]",
      children: message
    })
  });
};
const AdminDELETE$1 = withComponentProps(AdminDELETE);
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminDELETE$1
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "Mammon's Blog | Tags"
  }, {
    name: "description",
    content: "Security Researcher and Enthusiast. I’m fairly low profile, but share useful info from time to time. Red Team wannabe"
  }];
}
const Tags = () => {
  const {
    hash
  } = useLocation();
  const [tag, setTag] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useRef(null);
  useEffect(() => {
    const normalizedTag = hash.slice(1).toLowerCase().replace(/\s+/g, "-");
    setTag(normalizedTag);
  }, [hash]);
  useEffect(() => {
    api.get("/post").then(({
      data
    }) => {
      setPosts(data.data.posts.reverse());
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching posts:", error);
      setLoading(false);
    });
    return () => {
      setPosts([]);
      setLoading(true);
    };
  }, []);
  const countedTags = useMemo(() => {
    const allTags = posts.flatMap(({
      tag: tag2
    }) => tag2).map((t) => t.toLowerCase().replace(/\s+/g, "-"));
    const tagCount = {};
    for (const tag2 of allTags) {
      tagCount[tag2] = (tagCount[tag2] || 0) + 1;
    }
    return Object.entries(tagCount).sort((a, b) => b[1] - a[1]);
  }, [posts]);
  const filteredPosts = useMemo(() => {
    if (!tag || posts.length === 0) return [];
    return posts.filter((post) => {
      var _a;
      return (_a = post.tag) == null ? void 0 : _a.map((t) => t.toLowerCase().replace(/\s+/g, "-")).includes(tag);
    });
  }, [tag, posts]);
  const handleClick = (tag2) => {
    const el = document.getElementById(tag2);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return /* @__PURE__ */ jsx(DefaultLayout, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex",
      children: [/* @__PURE__ */ jsx(Sidebar, {}), !loading ? /* @__PURE__ */ jsxs("div", {
        className: "mt-[22px] w-3/4 ml-[50px] mb-[50px] pr-[200px]",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "page-title text-[26px] font-bold mb-[30px] underline",
          children: "Tags"
        }), /* @__PURE__ */ jsx("ul", {
          className: "space-y-2 grid grid-cols-3 gap-x-[50px] gap-y-[10px] !list-none ml-[-48px]",
          children: countedTags.map(([tag2, count]) => /* @__PURE__ */ jsx("li", {
            className: "pb-1",
            onClick: () => handleClick(tag2),
            children: /* @__PURE__ */ jsxs(Link, {
              to: `/tags/#${tag2}`,
              className: "flex justify-between border-b-[1px] border-[#51555d]",
              children: [/* @__PURE__ */ jsx("span", {
                className: "font-bold",
                children: tag2
              }), /* @__PURE__ */ jsx("span", {
                className: "font-bold",
                children: count
              })]
            })
          }, tag2))
        }), loading ? /* @__PURE__ */ jsx(Loading, {
          lines: 3
        }) : /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx("h2", {
            id: tag,
            ref: titleRef,
            className: "page-title text-[26px] font-bold mb-[30px] mt-[80px] underline",
            children: tag.toUpperCase()
          }), /* @__PURE__ */ jsx("ul", {
            className: "mt-8 flex flex-col gap-4 !list-none !pl-[32px]",
            children: filteredPosts.length > 0 ? filteredPosts.map((post) => /* @__PURE__ */ jsx("li", {
              className: "text-[18px] mb-2",
              children: /* @__PURE__ */ jsxs(Link, {
                to: `/post/${post._id}`,
                className: "flex flex-col gap-2",
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "text-[#699da0] underline hover:text-[#4a7b8c] text-[26px] font-bold",
                  children: post.title
                }), /* @__PURE__ */ jsxs("div", {
                  className: "text-[13px] flex items-center gap-1 opacity-70",
                  children: [/* @__PURE__ */ jsx("i", {
                    className: "fa-solid fa-calendar-days"
                  }), /* @__PURE__ */ jsx("span", {
                    children: formatDate(post.createdAt)
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  className: "line-clamp-2 text-[16px]",
                  dangerouslySetInnerHTML: {
                    __html: post.content
                  }
                })]
              })
            }, post._id)) : /* @__PURE__ */ jsx("p", {
              children: "No posts found for this tag."
            })
          })]
        })]
      }) : /* @__PURE__ */ jsx("div", {
        className: "mt-[22px] w-3/4 ml-[50px] mb-[50px] flex flex-col gap-2 pr-[200px]",
        children: /* @__PURE__ */ jsx("h1", {
          className: "page-title text-[26px] font-bold",
          children: "Loading..."
        })
      })]
    })
  });
};
const Tags$1 = withComponentProps(Tags);
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tags$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "Mammon's Blog | Categories"
  }, {
    name: "description",
    content: "Security Researcher and Enthusiast. I’m fairly low profile, but share useful info from time to time. Red Team wannabe"
  }];
}
const Categories = () => {
  const {
    hash
  } = useLocation();
  const [category, setCategory] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useRef(null);
  useEffect(() => {
    const normalizedCategory = hash.slice(1).toLowerCase().replace(/\s+/g, "-");
    setCategory(normalizedCategory);
  }, [hash]);
  useEffect(() => {
    api.get("/post").then(({
      data
    }) => {
      setPosts(data.data.posts.reverse());
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching posts:", error);
      setLoading(false);
    });
    return () => {
      setPosts([]);
      setLoading(true);
    };
  }, []);
  const countedCategories = useMemo(() => {
    const allCategories = posts.flatMap(({
      category: category2
    }) => category2).map((c) => c.toLowerCase().replace(/\s+/g, "-"));
    const categoryCount = {};
    for (const category2 of allCategories) {
      categoryCount[category2] = (categoryCount[category2] || 0) + 1;
    }
    return Object.entries(categoryCount).sort((a, b) => b[1] - a[1]);
  }, [posts]);
  const filteredPosts = useMemo(() => {
    if (!category || posts.length === 0) return [];
    return posts.filter((post) => {
      var _a;
      return (_a = post.category) == null ? void 0 : _a.map((t) => t.toLowerCase().replace(/\s+/g, "-")).includes(category);
    });
  }, [category, posts]);
  const handleClick = (category2) => {
    const el = document.getElementById(category2);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return /* @__PURE__ */ jsx(DefaultLayout, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex",
      children: [/* @__PURE__ */ jsx(Sidebar, {}), !loading ? /* @__PURE__ */ jsxs("div", {
        className: "mt-[22px] w-3/4 ml-[50px] mb-[50px] pr-[200px]",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "page-title text-[26px] font-bold mb-[30px] underline",
          children: "Categories"
        }), /* @__PURE__ */ jsx("ul", {
          className: "space-y-2 grid grid-cols-3 gap-x-[50px] gap-y-[10px] !list-none ml-[-48px]",
          children: countedCategories.map(([category2, count]) => /* @__PURE__ */ jsx("li", {
            className: "pb-1",
            onClick: () => handleClick(category2),
            children: /* @__PURE__ */ jsxs(Link, {
              to: `/categories/#${category2}`,
              className: "flex justify-between border-b-[1px] border-[#51555d]",
              children: [/* @__PURE__ */ jsx("span", {
                className: "font-bold",
                children: category2
              }), /* @__PURE__ */ jsx("span", {
                className: "font-bold",
                children: count
              })]
            })
          }, category2))
        }), loading ? /* @__PURE__ */ jsx(Loading, {
          lines: 3
        }) : /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx("h2", {
            id: category,
            ref: titleRef,
            className: "page-title text-[26px] font-bold mb-[30px] mt-[80px] underline",
            children: category.toUpperCase()
          }), /* @__PURE__ */ jsx("ul", {
            className: "mt-8 ml-8 flex flex-col gap-4 !list-none !pl-[32px]",
            children: filteredPosts.length > 0 ? filteredPosts.map((post) => /* @__PURE__ */ jsx("li", {
              className: "text-[18px] mb-2",
              children: /* @__PURE__ */ jsxs(Link, {
                to: `/post/${post._id}`,
                className: "flex flex-col gap-2",
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "text-[#699da0] underline hover:text-[#4a7b8c] text-[26px] font-bold",
                  children: post.title
                }), /* @__PURE__ */ jsxs("div", {
                  className: "text-[13px] flex items-center gap-1 opacity-70",
                  children: [/* @__PURE__ */ jsx("i", {
                    className: "fa-solid fa-calendar-days"
                  }), /* @__PURE__ */ jsx("span", {
                    children: formatDate(post.createdAt)
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  className: "line-clamp-2 text-[16px]",
                  dangerouslySetInnerHTML: {
                    __html: post.content
                  }
                })]
              })
            }, post._id)) : /* @__PURE__ */ jsx("p", {
              children: "No posts found for this category."
            })
          })]
        })]
      }) : /* @__PURE__ */ jsx("div", {
        className: "mt-[22px] w-3/4 ml-[50px] mb-[50px] flex flex-col gap-2 pr-[200px]",
        children: /* @__PURE__ */ jsx("h1", {
          className: "page-title text-[26px] font-bold",
          children: "Loading..."
        })
      })]
    })
  });
};
const Categories$1 = withComponentProps(Categories);
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Categories$1,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Cukw4C_C.js", "imports": ["/assets/chunk-AYJ5UCUI-6a0CsxBx.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-fvzrAdLe.js", "imports": ["/assets/chunk-AYJ5UCUI-6a0CsxBx.js", "/assets/with-props-Djoh9EVt.js"], "css": ["/assets/root-DU7LWGoo.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-DEdrmCYv.js", "imports": ["/assets/with-props-Djoh9EVt.js", "/assets/chunk-AYJ5UCUI-6a0CsxBx.js", "/assets/DefaultLayout-w4AkJxnC.js", "/assets/Loading-BKoXs-71.js", "/assets/formatDate-BqoJENqE.js", "/assets/api-B-7papqt.js", "/assets/Sidebar-DKz6v4Vh.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/About": { "id": "routes/About", "parentId": "root", "path": "/about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/About-C3DF2Afa.js", "imports": ["/assets/with-props-Djoh9EVt.js", "/assets/chunk-AYJ5UCUI-6a0CsxBx.js", "/assets/Sidebar-DKz6v4Vh.js", "/assets/DefaultLayout-w4AkJxnC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/AboutDetail": { "id": "routes/AboutDetail", "parentId": "root", "path": "/post/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/AboutDetail-COS3bchH.js", "imports": ["/assets/with-props-Djoh9EVt.js", "/assets/chunk-AYJ5UCUI-6a0CsxBx.js", "/assets/api-B-7papqt.js", "/assets/DefaultLayout-w4AkJxnC.js", "/assets/Sidebar-DKz6v4Vh.js", "/assets/formatDate-BqoJENqE.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/Admin": { "id": "routes/Admin", "parentId": "root", "path": "/admin", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/Admin-DM2MeBNr.js", "imports": ["/assets/with-props-Djoh9EVt.js", "/assets/chunk-AYJ5UCUI-6a0CsxBx.js", "/assets/api-B-7papqt.js", "/assets/DefaultLayout-w4AkJxnC.js", "/assets/TagInput-KPL0b6lr.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/AdminPUT": { "id": "routes/AdminPUT", "parentId": "root", "path": "/admin/post/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/AdminPUT-rIeBQtvx.js", "imports": ["/assets/with-props-Djoh9EVt.js", "/assets/chunk-AYJ5UCUI-6a0CsxBx.js", "/assets/api-B-7papqt.js", "/assets/DefaultLayout-w4AkJxnC.js", "/assets/TagInput-KPL0b6lr.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/AdminDELETE": { "id": "routes/AdminDELETE", "parentId": "root", "path": "/admin/delete-post/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/AdminDELETE-B-Rqgbfc.js", "imports": ["/assets/with-props-Djoh9EVt.js", "/assets/chunk-AYJ5UCUI-6a0CsxBx.js", "/assets/api-B-7papqt.js", "/assets/DefaultLayout-w4AkJxnC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/Tags": { "id": "routes/Tags", "parentId": "root", "path": "/tags", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/Tags-1JzqXvut.js", "imports": ["/assets/with-props-Djoh9EVt.js", "/assets/chunk-AYJ5UCUI-6a0CsxBx.js", "/assets/api-B-7papqt.js", "/assets/DefaultLayout-w4AkJxnC.js", "/assets/Loading-BKoXs-71.js", "/assets/Sidebar-DKz6v4Vh.js", "/assets/formatDate-BqoJENqE.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/Categories": { "id": "routes/Categories", "parentId": "root", "path": "/categories", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/Categories-DmXCABvg.js", "imports": ["/assets/with-props-Djoh9EVt.js", "/assets/chunk-AYJ5UCUI-6a0CsxBx.js", "/assets/api-B-7papqt.js", "/assets/DefaultLayout-w4AkJxnC.js", "/assets/Loading-BKoXs-71.js", "/assets/Sidebar-DKz6v4Vh.js", "/assets/formatDate-BqoJENqE.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-c8a92739.js", "version": "c8a92739", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/About": {
    id: "routes/About",
    parentId: "root",
    path: "/about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/AboutDetail": {
    id: "routes/AboutDetail",
    parentId: "root",
    path: "/post/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/Admin": {
    id: "routes/Admin",
    parentId: "root",
    path: "/admin",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/AdminPUT": {
    id: "routes/AdminPUT",
    parentId: "root",
    path: "/admin/post/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/AdminDELETE": {
    id: "routes/AdminDELETE",
    parentId: "root",
    path: "/admin/delete-post/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/Tags": {
    id: "routes/Tags",
    parentId: "root",
    path: "/tags",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/Categories": {
    id: "routes/Categories",
    parentId: "root",
    path: "/categories",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
