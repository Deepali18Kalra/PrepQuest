import React from 'react'

export default function RectangleSkeleton(){
    return (
		<div className='space-y-2.5 animate-pulse'>
			<div className='flex items-center w-full space-x-2'>
				<div className='h-6 w-12 rounded-full bg-gray-300'></div>
			</div>
		</div>
	);
}