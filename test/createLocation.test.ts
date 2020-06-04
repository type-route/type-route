import { createLocation } from "../src/createLocation";
import { defineRoute } from "../src/defineRoute";
import { buildPathDefs } from "../src/buildPathDefs";
import { getParamDefsOfType } from "../src/getParamDefsOfType";
import { createQueryStringSerializer } from "../src/createQueryStringSerializer";
import { param } from "../src/param";
import { UmbrellaParamDefCollection, GetRawPath } from "../src/types";

describe("createLocation", () => {
  test("exclude optional path param", () => {
    expectLocation(
      {
        name: param.path.string,
        version: param.path.optional.string,
      },
      (x) => `/software/${x.name}/${x.version}`,
      {
        name: "apache",
      }
    ).toEqual({
      path: "/software/apache",
      query: undefined,
      state: undefined,
    });
  });

  test("include optional path param", () => {
    expectLocation(
      {
        name: param.path.string,
        version: param.path.optional.string,
      },
      (x) => `/software/${x.name}/${x.version}`,
      {
        name: "apache",
        version: "2.1.4",
      }
    ).toEqual({
      path: "/software/apache/2.1.4",
      query: undefined,
      state: undefined,
    });
  });
});

function expectLocation(
  paramDefCollection: UmbrellaParamDefCollection,
  path: GetRawPath,
  paramCollection: Record<string, unknown>
) {
  const builder = defineRoute(
    {
      name: param.path.string,
      version: param.path.optional.string,
    },
    path
  );

  const pathDefs = buildPathDefs(
    "test",
    getParamDefsOfType("path", builder["~internal"].params),
    path
  );

  return expect(
    createLocation({
      paramCollection,
      paramDefCollection,
      pathDefs,
      queryStringSerializer: createQueryStringSerializer(),
      arraySeparator: ",",
    })
  );
}
