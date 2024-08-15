import React from 'react'
import Index from '../../Index'
import { Metadata, ResolvingMetadata } from 'next';
import { headers } from 'next/headers';

export async function generateMetadata(
  { params, searchParams }: { params: { postid: string }, searchParams: any },
  parent: ResolvingMetadata
): Promise<Metadata> {

  try {
    const response = await fetch(`https://backend.toonjoy.org/get/${params.postid}`, {
      headers: {
        'referer': `https://toonjoy.org/`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch metadata');
    }

    const data = await response.json();
    return {
      title: data.title || 'Default Title',
      description: data.description || 'Default Description',
      manifest: `../manifest.json`,
      twitter: {
        card: 'summary_large_image',
        title: data.title,
        description: data.description,
        images: data.image,
      },
      openGraph: {
        type: 'website',
        url: 'https://toonjoy.org',
        title: data.title,
        description: data.description,
        images: data.image,
        siteName: 'Toon Joy',
      },
    }
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      title: 'Post Page'
    }
  }
};

const Page = ({ params }: { params: { postid: string } }) => {
  return (
    <>
      <Index />
    </>
  )
}

export default Page;
