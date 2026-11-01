# Python

## uv

基本用法

```sh
brew install uv
uv init myproject
uv add pandas
uv remove pandas
uv python list
uv python use 3.13
uv sync
uv run main.py # 会使用 .python-version 指定的版本运行
```

uv add 与 uv pip 不同，参考：https://github.com/astral-sh/uv/issues/9219#issuecomment-2487159539

### ruff

1. 临时执行

```sh
uvx ruff format
uvx ruff check
```

会把ruff下载到项目目录下的 `.ruff_cache` 里，可以不安装就执行

2. 安装到项目里

```sh
uv add --dev ruff
uv run ruff check
```

也可以激活虚拟环境后直接执行 `ruff check`

3. 全局安装

```sh
uv tool install ruff@latest
brew install ruff

ruff check
ruff format
```

### ty

安装同ruff，可以使用uv run ty server启动，uv run 优先执行项目级ty，可以使用uv run which ty测试

## Python venv

python自带的虚拟环境管理

在venv环境下，用pip安装的包都被安装到虚拟环境所在 path，具体目录是 path/lib/python3.x/site-packages，
系统Python环境不受任何影响

```bash
python3 -m venv path/to/dir
cd path/to/dir
source bin/activate
deactivate
python3 -m venv -h #for more info
```
