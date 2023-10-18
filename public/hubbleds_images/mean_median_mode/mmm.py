import matplotlib.pyplot as plt
# set some nice fonts and fontsizes for the figure. 
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = 'Helvetica'
plt.rcParams['font.size'] = 12
# set some other options to make a nic web figure
plt.rcParams['figure.figsize'] = (6, 4)
plt.rcParams['figure.dpi'] = 100
plt.rcParams['savefig.dpi'] = 300

import numpy as np
from collections import Counter

data = np.array([9, 10, 11, 11, 12, 12, 12, 13, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 18, 18])

counter = Counter(data)
# list(zip(*counter.items())) is a nice trick to unpack the keys and values of the counter
values, counts = list(zip(*counter.items()))



mean = int(data.mean())
median = int(np.median(data))
mode = int(counter.most_common()[0][0])

fig, ax = plt.subplots()
ax.bar(values, counts, color = '0.35')

color = 'firebrick'
# set opacity of bars
# ax.bar([mean], [counter[mean]], color = color, label = 'Mean', alpha = 0.7)
# ax.bar([median], [counter[median]], color = color, label = 'Median', alpha = 0.5)
# ax.bar([mode], [counter[mode]], color = color, label = 'Mode', alpha = 0.3)

ax.set_xlabel('Values')
ax.set_ylabel('Counts')

# ax.legend()

fig.savefig('mmm.png', bbox_inches = 'tight')

stats = {
    'Mean': mean,
    'Median': median,
    'Mode': mode
    }

for stat, value in stats.items():
    fig, ax = plt.subplots()
    ax.bar(values, counts, color = '0.35')

    color = '#e60001'
    # set opacity of bars
    ax.bar([value], [counter[value]], color = color, label = stat,alpha=0.8)

    ax.set_xlabel('Values')
    ax.set_ylabel('Counts')

    ax.legend()

    fig.savefig(f'{stat}.png', bbox_inches = 'tight')
    plt.close()
    