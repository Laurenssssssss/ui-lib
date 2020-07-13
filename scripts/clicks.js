/*
	Copyright (c) DeltaNedas 2020

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

(() => {

const ui = require("library");

const uniform = new Vec2();
Events.on(EventType.Trigger.update, run(() => {
	if (!Core.input.justTouched()) {
		return;
	}

	// 0, 0 to w, h
	const pos = Core.input.mouse();
	// Position in the mindustry world
	const world = Core.input.mouseWorld()
	// Tile clicked
	const tile = Vars.world.tileWorld(world.x, world.y);
	// 0, 0 to 1, 1
	uniform.set(pos.x / Core.graphics.width, pos.y / Core.graphics.height);

	ui.clickEvents = ui.clickEvents.filter(event => {
		// Mod cancelled the event
		if (!event) return;

		if (!event.area || event.area.contains(uniform)) {
			event.handler(pos, tile);
			return event.keep;
		}
		return true;
	});
}));

})();