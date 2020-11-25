@echo off
for %%w in (abandoned chaotic frigid haven shrouded style tempestuous violent) do @echo off && echo Compiling less style "%%w" && .\node_modules\.bin\lessc --modify-var=palette="%%w" .\less\style.less .\css\%%w.css
