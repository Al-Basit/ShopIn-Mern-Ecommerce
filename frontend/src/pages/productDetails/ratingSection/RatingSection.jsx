import React from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
import { AiOutlineVerticalLeft } from 'react-icons/ai'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import StarRating from '../../../components/starRating/StarRating'


const RatingSection = () => {
  return (
    <ContentWrapper>
    <div className="container rating-section mt-9">
    <h3 className="text-4xl font-bold text-center md:text-5xl">Ratings and Reviews</h3>
    <div className="flex flex-col justify-between mt-9 md:flex-row">
      <div className="flex gap-2 p-4 flex-rowjustify-end">
    <span className="inline text-5xl md:text-6xl text-semibold">4.7</span>
    <div className='flex flex-col'>
<StarRating
value={4}
size={35}
/>
<span className='text-xl'>900 Reviews</span>
</div>
    </div>
    <div className="flex flex-row flex-wrap items-center justify-around gap-2 p-4">
    <button className="px-6 btn md:btn-wide"><span>See All Reviews</span>
    <AiOutlineVerticalLeft/>
    </button>
<button className="px-6 btn btn-neutral md:btn-wide "><span>Write a Review</span>
<BsFillPencilFill/>
</button>

    </div>
  </div>
    <div class="lg:p-10 p-6 bg-gray-100">
            <div class="mb-20 text-center">
                <h3 class="text-3xl font-extrabold">What our happy client say</h3>
            </div>
            <div class="grid md:grid-row-3 md:gap-6 max-md:gap-10 max-w-6xl mx-auto">
                <div class="h-auto py-8 px-4 lg:px-8 rounded-md mx-auto bg-white relative">
                    <img src="https://readymadeui.com/profile_2.webp" class="w-14 h-14 rounded-full absolute right-0 left-0 border-4 border-white shadow-xl mx-auto -top-7" />
                    <StarRating 
                    value={3}
                    size={25}
                    />
                    <div class="mt-4">
                        <p class="text-sm leading-relaxed">The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.</p>
                        <h4 class="text-base whitespace-nowrap font-extrabold mt-4">John Doe</h4>
                        <p class="mt-1 text-xs text-gray-400">Founder of Rubik</p>
                    </div>
                </div>
                <div class="h-auto py-8 px-4 lg:px-8 rounded-md mx-auto bg-white relative">
                    <img src="https://readymadeui.com/profile_2.webp" class="w-14 h-14 rounded-full absolute right-0 left-0 border-4 border-white shadow-xl mx-auto -top-7" />
                    <StarRating 
                    value={3}
                    size={25}
                    />
                    <div class="mt-4">
                        <p class="text-sm leading-relaxed">The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.</p>
                        <h4 class="text-base whitespace-nowrap font-extrabold mt-4">John Doe</h4>
                        <p class="mt-1 text-xs text-gray-400">Founder of Rubik</p>
                    </div>
                </div>
                <div class="h-auto py-8 px-4 lg:px-8 rounded-md mx-auto bg-white relative">
                    <img src="https://readymadeui.com/profile_2.webp" class="w-14 h-14 rounded-full absolute right-0 left-0 border-4 border-white shadow-xl mx-auto -top-7" />
                    <StarRating 
                    value={3}
                    size={25}
                    />
                    <div class="mt-4">
                        <p class="text-sm leading-relaxed">The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.</p>
                        <h4 class="text-base whitespace-nowrap font-extrabold mt-4">John Doe</h4>
                        <p class="mt-1 text-xs text-gray-400">Founder of Rubik</p>
                    </div>
                </div>
                <button className="mx-auto btn btn-neutral btn-wide">Load More Reviews</button>
            </div>
        </div>
  </div>
  </ContentWrapper>
  )
}

export default RatingSection
