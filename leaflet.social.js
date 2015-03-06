L.Control.Social = L.Control.extend({ 
  options: {
    position: 'bottomleft',
    url: "http://schools.mithron.me",
    links: [
      ['facebook', "Facebook", "https://www.facebook.com/sharer.php?u=_url_"],     
      ['vkontakte', "VK", "http://vk.com/share.php?url=_url_"]
    ]
  },

  initialize: function(options) {
    L.Util.setOptions(this, options);
  },

  share: function () {
    var url = this.link;
    url = url.replace(/_url_/, encodeURIComponent(this.self.options.text));   
    window.open(url);
  },

  onAdd: function(map) {
    this.map = map;
    this._container = L.DomUtil.create('div', 'leaflet-control');
    for (var i = 0; i < this.options.links.length; i++) {
      infos = this.options.links[i];
      var div = L.DomUtil.create('div', 'leaflet-social-control', this._container);
      var link = L.DomUtil.create('a', 'leaflet-social-control-'+infos[0], div);
      link.href = infos[2];
      link.title = infos[1];
      var span = L.DomUtil.create('span', 'fa fa-'+infos[0]+'-square', link);

      L.DomEvent
      .addListener(link, 'click', L.DomEvent.stopPropagation)
      .addListener(link, 'click', L.DomEvent.preventDefault)
      .addListener(link, 'click', this.share, {self: this, link: infos[2]});
    };

    return this._container;
  }
});

L.control.social = function (options) {
  return new L.Control.Social(options);
};
