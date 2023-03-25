import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { UserForm } from '@/features/form2/Form';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const csrfToken = res.getHeader('X-CSRF-Token') || 'missing';
  return { props: { csrfToken } };
};

const Home: NextPage<Props> = ({ csrfToken }) => {
  return (
    <>
      <p>CSRF token value: {csrfToken}</p>
      <UserForm csrfToken={csrfToken}></UserForm>
    </>
  );
};

export default Home;
