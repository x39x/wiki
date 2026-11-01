# 音频

## 无损

### Free Lossless Audio Codec(FLAC)

最常用的无损格式，开源

编码库BSD协议，接口GPL

### Apple Lossless Audio Codec(ALAC)

苹果开发的无损格式，已于2011年10月26日以Apache License为协议开源

## 有损

### Advanced Audio Coding(AAC)

基于MPEG-2的标准，MP3的继任者，但存在版权问题（主要是使用aac的编码解码器，个人听音乐无所谓）

YouTube 索尼 苹果 等使用aac作为默认编码格式

aac后缀指AAC 编码的音频 + ADTS（Audio Data Transport Stream）头部的流式封装格式，不常用，一般都是封装进m4a使用

有很多不同的规格

1. MPEG-2 AAC LC 低复杂度规格（Low Complexity）
2. MPEG-2 AAC Main 主规格
3. MPEG-2 AAC SSR 可变采样率规格（Scalable Sample Rate）
4. MPEG-4 AAC LC 低复杂度规格（Low Complexity），MP4的音频部分就包括了该规格音频
5. MPEG-4 AAC Main 主规格
6. MPEG-4 AAC SSR 可变采样率规格（Scalable Sample Rate）
7. MPEG-4 AAC LTP 长时期预测规格（Long Term Predication）
8. MPEG-4 AAC LD 低延迟规格（Low Delay）
9. MPEG-4 AAC HE 高效率规格（High Efficiency）

### MPEG Audio Layer III(MP3)

除兼容性之外没有优势

### Vorbis

开源，常见于ogg格式中，spotify使用 vorbis

### Opus

开源，常见与Ogg、WebM格式中，

设计目标是以单一格式对语音和一般音频进行高效编码，确保音质同时保持足够低的延迟以实现即时交互通信，并且对于低端嵌入式处理器来说有足够低的复杂性，适用于网络上低延迟的即时声音传输，取代Speex和Vorbis，标准格式定义于RFC 6716文件。Opus格式是一个开放格式，使用上没有任何专利或限制。

延迟低，压缩率高，低比特率的时候，音质远胜其它有损压缩格式，因此语音通话、视频会议等领域使用的比较多

## 容器

### ogg

Ogg可以以各种格式如Dirac，MNG，CELT，MPEG-4，MP3，Opus，Vorbis等包装音频和视频

但通常情况下ogg指以Opus/Vorbis编码的音频

参考：https://zhuanlan.zhihu.com/p/66719842

### m4a

MP4使用了MPEG-4进行封装的AAC编码， m4a是为了区别纯音频MP4文件和包含视频的MP4文件而由苹果公司使用的扩展名，M4A的本质和音频MP4相同，故MP4文件可直接更改扩展名为M4A

m4a可以封装 各种规格的AAC、MP3、FLAC格式，最常用的是AAC，苹果生态下推荐此格式

## 其他

https://github.com/QwenAudio/CosyVoice
