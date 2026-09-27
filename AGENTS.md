# AGENTS.md

## Project summary and core loop
Desviar e atirar até limpar a sala → portal abre → escolher 1 de 3 upgrades → próxima sala mais difícil; chefe a cada 10 salas; morte reinicia a run.

## How to play / controls
Arraste para mover a nave. Pare para ela atirar sozinha no inimigo mais próximo. Limpe a sala, entre no portal e escolha um upgrade.
Controls: Arrastar em qualquer lugar = joystick virtual. Toque em um card para escolher o upgrade. Botão 🔊 alterna o som.

## Important files
- `/index.html` — entry point: importmap, canvas/DOM shell, script bootstrap
- `/rosebud-game-defaults.css` — project file
- `/rosebud-game-defaults.js` — game module
- `/art_direction.md` — visual direction used for generated art
- `/sound_direction.md` — audio direction used for generated sound
- `/main.js` — game bootstrap and main loop

## Assets and audio
Images: `assets/boss-ship.webp`, `assets/enemy-alien.webp`, `assets/enemy-asteroid.webp`, `assets/enemy-drone.webp`, `assets/player-ship.webp`, `assets/space-bg.webp`
Audio: `assets/audio/explosion.mp3`, `assets/audio/space-music.mp3`, `assets/audio/upgrade.mp3`
Sound direction: - Music: epic retro synth space battle loop, medium energy - SFX: explosion (generated), upgrade chime (generated), laser shots procedural WebAudio
Playback note: reference media as `assets/...`; browsers start audio only after the first user gesture.

## Notes for future edits
Tudo fica em main.js. O objeto UPGRADES define os upgrades, spawnEnemy define os tipos de inimigo e S é o fator de escala (base 400x720). O recorde é salvo no localStorage com a chave spaceArcheroBest.

## Final validation / runtime status
Static: 0 blocking, 3 advisory; runtime completed (0 error(s)); overall clean.
Finished via the `finish` tool.
