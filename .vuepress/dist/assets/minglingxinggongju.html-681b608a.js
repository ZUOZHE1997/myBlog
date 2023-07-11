import{_ as e,r as p,o,c,b as n,d as s,e as t,a as i}from"./app-ec29cce2.js";const l="/js/node-cli.gif",u={},r={href:"https://github.com/ZUOZHE1997/translation-cmd",target:"_blank",rel:"noopener noreferrer"},d={href:"https://segmentfault.com/a/1190000016555129",target:"_blank",rel:"noopener noreferrer"},k=i(`<p>涉及到的 NPM 包</p><ul><li>chalk (让命令行的字符带上颜色)</li><li>cheerio (解析 DOM)</li><li>is-chinese (判断是不是中文)</li><li>no-case ( 转换为单词之间有空格的小写字符串)</li><li>ora (命令行加载中图标)</li><li>request (Node 发送 request 请求)</li><li>urlencode (将字符串以 URL 编码)</li></ul><h2 id="_1-前行提要" tabindex="-1"><a class="header-anchor" href="#_1-前行提要" aria-hidden="true">#</a> 1. 前行提要</h2><p>main 字段指定 package.json 中的出入口文件,如果安装命令行工具,则是由 bin 字段指定.</p><p>配置命令:</p><ol><li>这时命令名称为 tran,和包名相同</li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tran&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;bin&quot;</span><span class="token operator">:</span> <span class="token string">&quot;index.js&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>或单独指定命令名称</li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tran&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;bin&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;yd&quot;</span><span class="token operator">:</span> <span class="token string">&quot;index.js&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在 index.js 文件中开头写入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/usr/bin/env node

// 让系统动态的去查找node来执行你的脚本文件。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后将上面几个包安装好,就可以开始写了!</p><h2 id="_2-写代码" tabindex="-1"><a class="header-anchor" href="#_2-写代码" aria-hidden="true">#</a> 2. 写代码</h2><h4 id="获取命令行输入的内容-😁" tabindex="-1"><a class="header-anchor" href="#获取命令行输入的内容-😁" aria-hidden="true">#</a> 获取命令行输入的内容 😁</h4><p>可以用 process.argv 获取</p><p>process.argv 属性会返回一个数组，其中包含当 Node.js 进程被启动时传入的命令行参数。 第一个元素是 process.execPath。 第二个元素是正被执行的 javascript 文件的路径。 其余的元素是任何额外的命令行参数。</p><p>文件开头,引入相关包</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> chalk <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;chalk&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> ora <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;ora&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> request <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;request&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> isChinese <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;is-chinese&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> urlencode <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;urlencode&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> noCase <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;no-case&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> cheerio <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;cheerio&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> spinner <span class="token operator">=</span> <span class="token function">ora</span><span class="token punctuation">(</span><span class="token string">&#39;Loading...&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 定义一个文案,相当于加载中</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> word <span class="token operator">=</span> process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39; &#39;</span><span class="token punctuation">)</span> <span class="token comment">// 获取命令行输入的参数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在获取完参数后,先进行一个判断,如果参数为空就不再继续执行,此时把进程停掉</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>word<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  spinner<span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span>chalk<span class="token punctuation">.</span><span class="token function">red</span><span class="token punctuation">(</span><span class="token string">&#39;Please enter text&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 这一步是显示报错,相当于加载失败</span>
  process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 停掉进程</span>
<span class="token punctuation">}</span>

word <span class="token operator">=</span> noCase<span class="token punctuation">.</span><span class="token function">noCase</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span> <span class="token comment">// 把单词转换为中间带空格的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置请求" tabindex="-1"><a class="header-anchor" href="#配置请求" aria-hidden="true">#</a> 配置请求</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> isCh <span class="token operator">=</span> <span class="token function">isChinese</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>判断是不是中文,是中文返回 true</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">url</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> isCh <span class="token operator">?</span> <span class="token string">&#39;https://dict.youdao.com/w/eng/&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;https://dict.youdao.com/w/&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个地址是汉译英,第二个地址是英译汉,对中文或英文进行判断切换地址</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> option <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token function">url</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">urlencode</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">//</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置请求地址,将 word 链接到 url 中</p><h4 id="解析-html" tabindex="-1"><a class="header-anchor" href="#解析-html" aria-hidden="true">#</a> 解析 html</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">request</span><span class="token punctuation">(</span>option<span class="token punctuation">.</span>url<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span> response<span class="token punctuation">,</span> body</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
<span class="token operator">...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 request 发送请求,接下来就要用到 cheerio 包了,它可以在服务端用来解析 html</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> $ <span class="token operator">=</span> cheerio<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span> <span class="token comment">// 加载html</span>
<span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;#phrsListTab &gt; .trans-container &gt; ul&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 开始查找相关的id,class以及标签</span>
  <span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// text()方法可以将其转换成字符串</span>
  <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\s+</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 用正则把空格处理掉</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 有些情况是长句翻译,会没有上面的节点,所所以需要判断一下</span>
  result <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span>
    <span class="token string">&#39;#ydTrans &gt; #fanyiToggle &gt; .trans-container &gt; p:nth-child(2)&#39;</span>
  <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// 取得长句翻译的节点</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>chalk<span class="token punctuation">.</span><span class="token function">green</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="本地运行" tabindex="-1"><a class="header-anchor" href="#本地运行" aria-hidden="true">#</a> 本地运行</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm link
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行完命令后就可以 用 yd 加单词进行输入了 😁</p><p><img src="`+l+`" alt="result.gif"></p><p>我的 bin 字段</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>  <span class="token property">&quot;bin&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;yd&quot;</span><span class="token operator">:</span> <span class="token string">&quot;index.js&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>源码奉上: index.js</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token hashbang comment">#!/usr/bin/env node</span>

<span class="token keyword">const</span> chalk <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;chalk&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> ora <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;ora&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> request <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;request&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> isChinese <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;is-chinese&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> urlencode <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;urlencode&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> noCase <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;no-case&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> cheerio <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;cheerio&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> spinner <span class="token operator">=</span> <span class="token function">ora</span><span class="token punctuation">(</span><span class="token string">&#39;Loading...&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">let</span> word <span class="token operator">=</span> process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39; &#39;</span><span class="token punctuation">)</span> <span class="token comment">// 获取命令行输入的参数</span>

word <span class="token operator">=</span> noCase<span class="token punctuation">.</span><span class="token function">noCase</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>word<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  spinner<span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span>chalk<span class="token punctuation">.</span><span class="token function">red</span><span class="token punctuation">(</span><span class="token string">&#39;Please enter text&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// Stop the process</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span>

<span class="token keyword">const</span> isCh <span class="token operator">=</span> <span class="token function">isChinese</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token function-variable function">url</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> isCh <span class="token operator">?</span> <span class="token string">&#39;https://dict.youdao.com/w/eng/&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;https://dict.youdao.com/w/&#39;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> option <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token function">url</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">urlencode</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

spinner<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token function">request</span><span class="token punctuation">(</span>option<span class="token punctuation">.</span>url<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span> response<span class="token punctuation">,</span> body</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    spinner<span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span>chalk<span class="token punctuation">.</span><span class="token function">red</span><span class="token punctuation">(</span><span class="token string">&#39;ERROR&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    spinner<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> $ <span class="token operator">=</span> cheerio<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span>
    <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;#phrsListTab &gt; .trans-container &gt; ul&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\s+</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// console.log(</span>
      <span class="token comment">//   $(&#39;#ydTrans &gt; #fanyiToggle &gt; .trans-container &gt; p:nth-child(2)&#39;).text()</span>
      <span class="token comment">// )</span>
      result <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span>
        <span class="token string">&#39;#ydTrans &gt; #fanyiToggle &gt; .trans-container &gt; p:nth-child(2)&#39;</span>
      <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>chalk<span class="token punctuation">.</span><span class="token function">green</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,40);function v(m,b){const a=p("ExternalLinkIcon");return o(),c("div",null,[n("p",null,[n("a",r,[s("项目地址"),t(a)]),s(" 项目源码在最后面")]),n("p",null,[s("参考文章 "),n("a",d,[s("从 1 到完美，用 node 写一个命令行工具"),t(a)])]),k])}const h=e(u,[["render",v],["__file","minglingxinggongju.html.vue"]]);export{h as default};