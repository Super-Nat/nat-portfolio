import HeroForm from "./components/HeroForm";

const HeroFeature = () => {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Hero</h1>
        <p className="text-muted-foreground">Manage your hero section</p>
      </div>
      <HeroForm />
    </div>
  );
};

export default HeroFeature;
