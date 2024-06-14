import React from 'react'
import Index from '../../Index'
import { Metadata, ResolvingMetadata } from 'next';
import { headers } from 'next/headers';

export async function generateMetadata(
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {

  try {
    let ax = await fetch(`http://192.168.1.231:3001/get/${params.postid}`, {
      headers: {
        'referer': `http://192.168.1.231:3000/`
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
        url: 'https://toonjoy.example.com',
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
