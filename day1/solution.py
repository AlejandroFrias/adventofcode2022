import os

# read the input.txt file in this directory and group the calory inputs into arrays
dir_path = os.path.dirname(os.path.realpath(__file__))
with open(dir_path + '/input.txt', 'r') as file:
    calories = [line.split('\n') for line in file.read().strip().split('\n\n')]

# sum the calories and sort them largest to smallest
totals = sorted(map(lambda line: sum(map(int, line)), calories), reverse=True)

print('Max:', max(totals))
print('Sum of largest 3:', sum(totals[0:3]))