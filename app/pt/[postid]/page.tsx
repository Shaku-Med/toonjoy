import React from 'react'
import Index from '../../Index'
import { Metadata, ResolvingMetadata } from 'next';
import { headers } from 'next/headers';

export async function generateMetadata(
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {

  try {
    let ax = await fetch(`https://backend.toonjoy.org/get/${params.postid}`, {
      headers: {
        'referer': `https://toonjoy.org/`
      }
    });
    let dd = await ax.json()
    return {
      title: dd.title,
      description: dd.description,
      twitter: {
        card: 'summary_large_image',
        title: dd.title,
        description: dd.description,
        images: dd.image,
      },
      openGraph: {
        type: 'website',
        url: 'https://toonjoy.org',
        title: dd.title,
        description: dd.description,
        images: dd.image,
        siteName: 'Toon Joy',
      },
    }
  }
  catch {
    return {
      title: 'Post Page'
    }
  }
};
let page = ({ params }: any) => {
  return (
    <>
      <Index />
    </>
  )
}

export default page
