L.Control.Social = L.Control.extend({ 
  options: {
    position: 'bottomleft',    
	title: "Расходы школ Москвы",
	desc: "",
	image: "http://schools.mithron.me/project-cover2.png",
	url: "",
    links: [
      ['facebook', "Facebook", "https://www.facebook.com/sharer.php?u="],     
      ['vk', "VK", "https://vk.com/share.php?url=http://schools.mithron.me/"]
    ]
  },

  initialize: function(options) {
    L.Util.setOptions(this, options);
  },
  
  share: function () {    
	if (this.type == vk) {
		var url = encodeURIComponent(this.self.options.url);
		var title = encodeURIComponent(this.self.options.title);
		var desc= encodeURIComponent(this.self.options.desc);
		var image = encodeURIComponent(this.self.options.image);
		var finalurl = this.link + 'title=' + title + '&description=' + desc + '&image=' + image + '&url=' + url;
		}
	if (this.type == facebook) {
		/* <meta property="og:title" content="The Rock"/>
			<meta property="og:type" content="website"/>
			<meta property="og:url" content="http://schools.mithron.me"/>
			<meta property="og:image" content="http://ia.media-imdb.com/rock.jpg"/>
			<meta property="og:site_name" content="IMDb"/>
			<meta property="fb:admins" content="USER_ID"/>
			<meta property="og:description"
							content="A group of U.S. Marines, under command of
								a renegade general, take over Alcatraz and
								threaten San Francisco Bay with biological
								weapons."/> */		
		var meta = document.createElement('meta');
		meta.property = "og:title";
		meta.content = this.self.options.title;		
		document.getElementsByTagName('head')[0].appendChild(meta);
		var meta = document.createElement('meta');
		meta.property = "og:description";
		meta.content = this.self.options.desc;		
		document.getElementsByTagName('head')[0].appendChild(meta);
		var meta = document.createElement('meta');
		meta.property = "og:image";
		meta.content = this.self.options.image;		
		document.getElementsByTagName('head')[0].appendChild(meta);	
		var meta = document.createElement('meta');
		meta.property = "og:type";
		meta.content = "website";		
		document.getElementsByTagName('head')[0].appendChild(meta);			
		var meta = document.createElement('meta');
		meta.property = "og:url";
		meta.content = "http://schools.mithron.me";		
		document.getElementsByTagName('head')[0].appendChild(meta);	
		var meta = document.createElement('meta');
		meta.property = "og:site_name";
		meta.content = "Расходы школ Москвы";		
		document.getElementsByTagName('head')[0].appendChild(meta);	
		var finalurl = this.link + encodeURIComponent(this.self.options.url);
		}
	
    window.open(finalurl);
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
      .addListener(link, 'click', this.share, {self: this, type: infos[0], link: infos[2]});
    };

    return this._container;
  }
});

L.control.social = function (options) {
  return new L.Control.Social(options);
};
