import numpy as np
import matplotlib.pyplot as plt

fs = 8000  # サンプリング周波数
ts = 1/fs   # サンプリング間隔
f1 = 1000   # 1000Hzの周波数
f2 = 2000   # 2000Hzの周波数
N = 16      # サンプル数
# m = 0:16   # DFTの出力成分のインデックス

t = np.linspace(0, (N-1)*ts, N)
fstep = (fs/N)
f = np.linspace(0, (N-1)*fstep, N)

y = (1 * np.sin(2*np.pi*f1*t) + 0.5 * np.sin(2*np.pi*f2*t + (3*np.pi/4)))  # 信号

X = np.fft.fft(y)
X_mag = np.abs(X) / N

fig1, ax1 = plt.subplots(nrows=1, ncols=1)
ax1.stem(t, y)
plt.show()
# plt.savefig('ts.png')  # 保存

fig1, ax2 = plt.subplots(nrows=1, ncols=1)
ax2.stem(f, X_mag)
plt.show()
# plt.savefig('fft.png')  # 保存
