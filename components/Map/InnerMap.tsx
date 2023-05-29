import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FC, useEffect, useRef } from "react";
import { CanvasLayer } from "./CanvasLayer";
import { ContentLayer } from "./ContentLayer";
import { GradientLayer } from "./GradientLayer";

interface Props {
  onCenterClick: () => unknown;
}

export const InnerMap: FC<Props> = ({ onCenterClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null!);
  const map = useRef<L.Map>();

  const centerClickRef = useRef(onCenterClick);

  useEffect(() => {
    centerClickRef.current = onCenterClick;
  });

  useEffect(() => {
    map.current = L.map(mapContainer.current!, {
      crs: L.CRS.Simple,
      attributionControl: false,
      zoomSnap: 0,
      maxZoom: DEFAULT_ZOOM,
      minZoom: DEFAULT_ZOOM,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
      maxBounds: bounds,
      maxBoundsViscosity: 1,
      inertiaDeceleration: 2000,
      inertiaMaxSpeed: 800,
      fadeAnimation: false,
      doubleClickZoom: false,
    });

    map.current.on("click", (e) => {
      if (map.current!.distance(e.latlng, map.current!.getCenter()) < 6) {
        centerClickRef.current();
      }
    });

    const gradient = new GradientLayer("", bounds);
    gradient.addTo(map.current);

    const canvas = new CanvasLayer({
      pane: "overlayPane",
      className: "transition-none",
    });
    canvas.addTo(map.current);

    const content = new ContentLayer("", bounds);
    content.addTo(map.current);

    map.current.fitBounds(bounds);

    L.marker([1000, 700], {
      icon: L.icon({
        iconUrl: "/works/1 1.png",
      }),
      interactive: false,
    }).addTo(map.current);

    L.marker([600, 200], {
      icon: L.icon({
        iconUrl: "/works/dul_1 1.png",
      }),
      interactive: false,
    }).addTo(map.current);

    L.marker([400, 750], {
      icon: L.icon({
        iconUrl: "/works/tramvaj 1.png",
      }),
      interactive: false,
    }).addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="h-[100vh] w-[100vw] bg-primary text-white"
    />
  );
};

export const DEFAULT_ZOOM = 3;
var bounds = [
  [0, 0],
  [1000, 1000],
] as [[number, number], [number, number]];
