import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/about": {};
  "/post/:id": {
    "id": string;
  };
  "/admin": {};
  "/admin/post/:id": {
    "id": string;
  };
  "/admin/delete-post/:id": {
    "id": string;
  };
  "/tags": {};
  "/categories": {};
};