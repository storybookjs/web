/* eslint-disable @next/next/no-img-element -- TODO */
import { Container } from '@repo/ui';

const reviewComments = [
  { id: 0, image: '/home/automate/comment-1.svg' },
  { id: 1, image: '/home/automate/comment-2.svg' },
  { id: 2, image: '/home/automate/comment-3.svg' },
];

export function UIReview() {
  return (
    <Container>
      <figure>
        <div className="relative mx-auto mb-[22%] mt-12 max-w-[715px] sm:mt-16 md:mb-[160px]">
          <img
            alt=""
            className="block w-[55%]"
            src="/home/automate/datepicker-compact-week.svg"
          />
          <div
            className="absolute right-0 top-0 flex h-[132%] w-[52%] flex-none flex-col justify-end gap-[2.5%]"
            style={{ transform: 'translate3d(0%, 8.5%, 0)' }}
          >
            {reviewComments.map(({ id, image }) => (
              <img
                className="block h-[32%] w-auto shadow-lg"
                key={id}
                src={image}
                alt="Comment from a user"
              />
            ))}
          </div>
        </div>
      </figure>
    </Container>
  );
}
