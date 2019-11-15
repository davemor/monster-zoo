import os
import glob
from pathlib import Path

from wand.image import Image

paths = glob.glob('./public/images/*.jpg')
filepaths = [Path(p) for p in paths]

for path in filepaths:
    with Image(filename=path) as img:
        img.format = 'png'
        outname = path.with_suffix('.png')
        print("saving out: {}".format(outname))
        img.save(filename=str(outname))
