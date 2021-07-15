import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Perfil() {

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    console.log(router)
  }, [query.id]);

  return (
    <>
      <img src={`https://github.com/${query.id}.png`} style={{ width: '100px' } } alt="" />
      <h1>{query.id}</h1>
    </>
  )
}