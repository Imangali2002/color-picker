import numpy as np
import pyautogui
import keyboard
from os import system
from Xlib import display
import eel
def queryMousePosition():
    data = display.Display().screen().root.query_pointer()._data
    return {'x': data['root_x'], 'y': data['root_y']}

def rgb_to_hex(r, g, b):
    return ('{:X}{:X}{:X}').format(r, g, b)

counter = 0
prev_color = ''

@eel.expose
def get_color(stop):
    system('clear')

    cur = queryMousePosition()

    img = pyautogui.screenshot(region=(cur['x']-1, cur['y']-1, 1, 1))

    img_array = np.array(img)
    hex_color = rgb_to_hex(img_array[0][0][0], img_array[0][0][1], img_array[0][0][2])
    
    global counter
    global prev_color

    if prev_color != hex_color:
        counter = 0
    counter += 1
    prev_color = hex_color

    if counter == 5:
        counter = 0
        return [hex_color, True]
    else:
        return [hex_color, False]

eel.init("web")
system('clear')
eel.start("main.html", size=(500, 300))