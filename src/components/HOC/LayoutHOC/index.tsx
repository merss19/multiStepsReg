import {Layout} from 'components/Layout';
import * as React from 'react';

export const LayoutHOC = (overrideProps?: any) =>(Component: any) =>(props:any) =>{
  return (
    <Layout {...props}{...overrideProps}>
      <Component />
    </Layout>
  );
};