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
      "bg-gradient-radial from-white to-90% to-primary"
    );
  },
});
