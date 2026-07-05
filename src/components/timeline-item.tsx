import { LocationMapButton } from "@/components/location-map-button";

type TimelineItemProps = {
  title: string;
  organization: string;
  locationName?: string;
  address?: string;
  embedUrl?: string;
  mapUrl?: string;
  date: string;
  description: string;
};

export function TimelineItem({
  title,
  organization,
  locationName,
  address,
  embedUrl,
  mapUrl,
  date,
  description,
}: TimelineItemProps) {
  const hasLocation = locationName && address && embedUrl && mapUrl;

  return (
    <article className="relative pl-12">
      <div className="absolute left-0 top-1 grid size-9 place-items-center rounded-full border border-violet-300/40 bg-violet-500 text-sm font-bold text-white shadow-lg shadow-violet-950/40">
        {date.slice(-2)}
      </div>
      <div className="absolute bottom-0 left-4 top-12 w-px bg-violet-400/25" />
      <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 ease-out hover:-translate-y-1 hover:border-violet-300/35 hover:bg-white/[0.055] hover:shadow-xl hover:shadow-violet-950/25">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-heading text-xl font-semibold text-white">{title}</h3>
            {hasLocation ? (
              <LocationMapButton
                name={locationName}
                address={address}
                embedUrl={embedUrl}
                mapUrl={mapUrl}
                className="-ml-2 px-2 py-1"
              />
            ) : (
              <p className="text-sm font-medium text-violet-200">{organization}</p>
            )}
          </div>
          <p className="text-sm text-zinc-400">{date}</p>
        </div>
        <p className="mt-4 leading-7 text-zinc-300">{description}</p>
      </div>
    </article>
  );
}
