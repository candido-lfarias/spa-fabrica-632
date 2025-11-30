// src/components/layout/PageHero.tsx
export default function PageHero({ title, right }:{title:string; right?:React.ReactNode}){
  return (
    <div className="page-hero">
      <div className="page-hero__title">{title}</div>
      <div>{right}</div>
    </div>
  );
}
