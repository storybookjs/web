import { cn, container } from '../../../lib/tailwind';

const reviewComments = [
  { id: 0, image: '/home/automate/comment-1.svg' },
  { id: 1, image: '/home/automate/comment-2.svg' },
  { id: 2, image: '/home/automate/comment-3.svg' },
];

export function UIReview() {
  return (
    <figure className={cn(container)}>
      <div className="relative mt-12 mx-auto mb-[22%] md:mb-[160px] max-w-[715px] sm:mt-16">
        <img
          className="block w-[55%]"
          src="/home/automate/datepicker-compact-week.svg"
          alt=""
        />
        <div
          className="flex-none w-[52%] h-[132%] absolute right-0 top-0 flex flex-col justify-end gap-[2.5%]"
          style={{ transform: 'translate3d(0%, 8.5%, 0)' }}
        >
          {reviewComments.map(({ id, image }) => (
            <img
              className="block h-[32%] w-auto shadow-lg"
              key={id}
              src={image}
            />
          ))}
        </div>
      </div>
    </figure>
  );
}
