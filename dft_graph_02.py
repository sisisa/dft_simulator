import numpy as np
import japanize_matplotlib
import matplotlib.pyplot as plt

# サンプルデータの作成
num_samples = 256  # サンプル数
sampling_rate = 1.0 / 64.0  # サンプリングレート
t = np.arange(0, num_samples) * sampling_rate  # 時間軸

# サイン波とコサイン波の和を作成
frequency1 = 4.0
frequency2 = 8.0
signal = np.sin(2 * np.pi * frequency1 * t) + np.cos(2 * np.pi * frequency2 * t)

# DFTを実行
dft_result = np.fft.fft(signal)
frequencies = np.fft.fftfreq(num_samples, sampling_rate)

# グラフ作成
plt.figure(figsize=(10, 6))

# 元の信号のプロット
plt.subplot(2, 1, 1)
plt.plot(t, signal)
plt.title('元の信号')

# 周波数成分のプロット
plt.subplot(2, 1, 2)
plt.plot(frequencies, np.abs(dft_result))
plt.title('DFT Result')
plt.xlabel('周波数 (Hz)')
plt.ylabel('大きさ')

plt.tight_layout()
plt.show()
