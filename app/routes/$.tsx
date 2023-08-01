// import type {LoaderArgs} from '@shopify/remix-oxygen';

// export async function loader({request}: LoaderArgs) {
//   throw new Response(`${new URL(request.url).pathname} not found`, {
//     status: 404,
//   });
// }
import type {V2_MetaFunction} from '@shopify/remix-oxygen';
import {defer, type LoaderArgs} from '@shopify/remix-oxygen';
import { useLoaderData} from '@remix-run/react';
import { BuilderComponent, builder } from '@builder.io/react';

builder.init('d0e05baec9a84531819193f84f3e8f75');

export const meta: V2_MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({context, params}: LoaderArgs) {
  console.log('url path dsdasasdadas', `/${params['*']}`);

  const page = await builder
    .get('page', {
      userAttributes: {
        urlPath: `/${params['*']}`,
      },
    })
    .toPromise();

  return defer({content: page});
}

export default function Page() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      {/* @ts-ignore next-line */}
      <BuilderComponent model="page" content={data.content} />
    </div>
  );
}
