# Obsidian Literate Haskell Plugin

[Haskell provides native literate programming support](https://wiki.haskell.org/Literate_programming),
allowing haskell code within `.lhs` text files to act like ordinary `.hs` files.
This seems like a good way to include runnable haskell code in [Obsidian](https://osidian.md),
but in order to mark a block of text as haskell code,
you need to surround it with

```
\begin{code}
...
\end{code}
```

which you probably don't want literring your code blocks.
This plugin provides literate haskell support by doing the following

- Treating `.lhs` files like markdown
- Hiding the `\begin{code}` and `\end{code}` in `.haskell` blocks in `.lhs` files

