import L from "leaflet";

interface GradientLayer {
  new (
    url: string,
    bounds: [[number, number], [number, number]]
  ): L.GridLayer & {
    _image: HTMLElement;
  };
}

export const GradientLayer: GradientLayer = L.ImageOverlay.extend({
  _initImage: function (this: InstanceType<GradientLayer>) {
    this._image = L.DomUtil.create(
      "div",
      "bg-gradient-radial from-[#E3C8C2] via-[#E3C8C2] via-67% to-80% to-[#FF4820]"
    );
  },
});
