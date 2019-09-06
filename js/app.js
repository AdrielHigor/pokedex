//Script by Adriel Higor

function add_data(json) {
  //select data section
  var poke_data = document.getElementById("poke_data");

  if ($("#poke_data").children().length == 0) {
    for (i in json) {
      //create a div for each pokemon in our json
      var pokemon = document.createElement("div");
      pokemon.setAttribute("class", "pokemon");
      pokemon.setAttribute("data-name", json[i]["name"]);
      pokemon.setAttribute("data-type", json[i]["type"]);
      pokemon.setAttribute("tabindex", json[i]["id"]);

      //create the pokemon's picture canvas
      var pokemon_figure = document.createElement("figure");
      pokemon_figure.setAttribute("class", "pokemon-figure");

      //add the pokemon's local picture to the div
      var img = document.createElement("img");
      img.setAttribute("src", "img/" + json[i]["name"] + ".png");

      pokemon_figure.appendChild(img);
      pokemon.appendChild(pokemon_figure);

      var pokemon_description = document.createElement("section");
      pokemon_description.setAttribute("class", "pokemon-description");

      var pokemon_id = document.createElement("span");
      pokemon_id.setAttribute("class", "pokemon-id");
      pokemon_id.innerHTML = json[i]["id"];

      pokemon_description.appendChild(pokemon_id);

      var pokemon_name = document.createElement("h1");
      pokemon_name.setAttribute("class", "pokemon-name");
      pokemon_name.innerHTML = json[i]["name"];

      pokemon_description.appendChild(pokemon_name);

      var pokemon_types = document.createElement("div");
      pokemon_types.setAttribute("class", "pokemon-types");
      for (type in json[i]["type"]) {
        var pokemon_type = document.createElement("span");
        pokemon_type.setAttribute(
          "class",
          "pokemon-type background-" + json[i]["type"][type]
        );
        pokemon_type.innerHTML = json[i]["type"][type];
        pokemon_types.appendChild(pokemon_type);
      }

      pokemon_description.appendChild(pokemon_types);

      pokemon.appendChild(pokemon_description);

      var pokemon_stats = document.createElement("section");
      pokemon_stats.setAttribute("class", "pokemon-stats");

      for (stat in json[i]["stats"]) {
        var stat_row = document.createElement("div");
        stat_row.setAttribute("class", "stat-row");

        var stat_name = document.createElement("div");
        stat_name.innerHTML = stat;

        stat_row.appendChild(stat_name);

        var stat_bar = document.createElement("div");
        stat_bar.setAttribute("class", "stat-bar");

        var stat_bar_bg = document.createElement("div");
        stat_bar_bg.setAttribute("class", "stat-bar-bg");

        var percentage =
          (json[i]["stats"][stat] / json[i]["stats"]["total"]) * 100;
        stat_bar_bg.setAttribute("style", "width: " + percentage + "%;");
        stat_bar_bg.innerHTML = json[i]["stats"][stat];

        stat_bar.appendChild(stat_bar_bg);

        stat_row.appendChild(stat_bar);

        pokemon_stats.appendChild(stat_row);
        //        (json[i]['stats'].hp)
      }

      pokemon.appendChild(pokemon_stats);

      poke_data.appendChild(pokemon);
    }
  } else {
    var poke_data = document.getElementById("poke_data");
    var pokemon = poke_data.lastElementChild;
    while (pokemon) {
      poke_data.removeChild(pokemon);
      pokemon = poke_data.lastElementChild;
    }
    add_data(json);
  }
}

var filter_type = document.getElementById("filter-type");
var filter_name = document.getElementById("filter-name");
var sort_type = document.getElementById("sort-type");

function sort_json(json){
    if (sort_type.value == 'a-z'){
        console.log(json.sort())
        return json.sort();
    } else if(sort_type.value == 'z-a'){
        console.log(json.reverse())
        return json.reverse();
    } else {
        console.log(json)
        return json
    }
}

function filter() {
  $.getJSON("data/pokedex.json", function(json) {
    data = sort_json(json)
    if (filter_type.value == "") {
      var filtered_json = data.filter(
        d => d.name.indexOf(filter_name.value) > -1
      );
    } else {
      var filtered_json = data.filter(
        d =>
          d.name.indexOf(filter_name.value) > -1 &&
          d.type.indexOf(filter_type.value) > -1
      );
    }
    add_data(filtered_json);
  });
}

$("#filter-name").keyup(function() {
  filter();
});

$("#filter-type").change(function() {
  filter();
});

$("#sort-type").change(function() {
    filter();
});

filter()
