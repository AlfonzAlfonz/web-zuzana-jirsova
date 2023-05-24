import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FC, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

const DEFAULT_ZOOM = 3;
var bounds = [
  [0, 0],
  [1000, 1000],
] as [[number, number], [number, number]];

export const InnerMap: FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null!);
  const map = useRef<L.Map>();

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
    });

    const layer = new GradientLayer("", bounds);
    layer.addTo(map.current);

    const canvas = new CanvasLayer("", bounds);
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
  });

  useEffect(() => {});

  return (
    <>
      <div ref={mapContainer} className="h-[100vh] w-[100vw] bg-primary" />
      <div></div>
    </>
  );
};

interface GradientLayer {
  new (
    url: string,
    bounds: [[number, number], [number, number]]
  ): L.GridLayer & {
    _image: HTMLElement;
  };
}

interface CanvasLayer {
  new (
    url: string,
    bounds: [[number, number], [number, number]]
  ): L.GridLayer & {
    _image: HTMLElement;
    _map: L.Map;
  };
}

const SIZE = 1000 * 2 ** DEFAULT_ZOOM;
const WIDTH = 20 * 2 ** (DEFAULT_ZOOM - 2);
console.log({ SIZE });

const CanvasLayer: CanvasLayer = L.ImageOverlay.extend({
  _initImage: function (this: InstanceType<CanvasLayer>) {
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;

    const ctx = canvas.getContext("2d")!;

    let prevPoint = toXY(this._map.getCenter());
    this._map.on("move", (e) => {
      if (!ctx) return;
      const point = toXY(this._map.getCenter());
      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.lineWidth = WIDTH * 2;

      ctx.beginPath();
      ctx.arc(point.x, point.y, WIDTH, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();

      prevPoint = point;
    });

    this._image = canvas;
  },
});
const toXY = ({ lat, lng }: L.LatLng) => ({
  x: Math.round(lng * (SIZE / 1000)),
  y: Math.round(SIZE - lat * (SIZE / 1000)),
});

const GradientLayer: GradientLayer = L.ImageOverlay.extend({
  _initImage: function (this: InstanceType<GradientLayer>) {
    this._image = L.DomUtil.create(
      "div",
      "bg-gradient-radial from-white to-90% to-primary"
    );
  },
});

interface ContentLayer {
  new (
    url: string,
    bounds: [[number, number], [number, number]]
  ): L.GridLayer & {
    _image: HTMLElement;
  };
}

const ContentLayer: ContentLayer = L.ImageOverlay.extend({
  _initImage: function (this: InstanceType<ContentLayer>) {
    const root = document.createElement("main");
    root.classList.add("leaflet-tile-container");
    root.classList.add("z-[500]");

    createRoot(root).render(
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="h-[100vh] p-4 text-primary">
          <p></p>
          <h1 className="text-center">
            <div>Toto je web portfolio</div>
            <div className="text-5xl">
              Zuzany <br />
              Jirsové
            </div>
          </h1>
        </div>
      </div>
    );

    this._image = root;
  },
});
