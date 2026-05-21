// Batch Upload Modal + AI Upload Modal

// ─── Batch Upload Modal ──────────────────────────────────────────────────────
function BatchUploadModal({ onClose, showToast }) {
  const [step, setStep] = React.useState(1); // 1=intro, 2=upload, 3=processing, 4=result
  const [dragOver, setDragOver] = React.useState(false);
  const [file, setFile] = React.useState(null);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
  };

  const handleUpload = () => {
    setStep(3);
    setTimeout(() => setStep(4), 2800);
  };

  const resultErrors = [
    { row: 3, field: '產品名稱', msg: '必填欄位為空' },
    { row: 7, field: '定價', msg: '數值格式錯誤（請填入數字）' },
  ];

  return (
    <ModalOverlay onClose={onClose}>
      <div style={{ width: 580, background: '#fff', border: '1px solid #DCDFE6' }}>
        {/* Header */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>批量上傳產品</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#909399', fontSize: 18 }}>×</button>
        </div>

        <div style={{ padding: 24 }}>
          {/* Steps indicator */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 28 }}>
            {['下載範本', '上傳檔案', '解析中', '完成'].map((s, i) => {
              const n = i + 1;
              const active = step === n;
              const done = step > n;
              return (
                <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, position: 'relative' }}>
                  {i < 3 && <div style={{ position: 'absolute', top: 14, left: '50%', width: '100%', height: 1, background: done ? '#303133' : '#DCDFE6', zIndex: 0 }} />}
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: done ? '#303133' : active ? '#303133' : '#F5F7FA',
                    border: `2px solid ${done || active ? '#303133' : '#DCDFE6'}`,
                    color: done || active ? '#fff' : '#909399',
                    fontSize: 13, fontWeight: 700, position: 'relative', zIndex: 1,
                  }}>{done ? '✓' : n}</div>
                  <div style={{ fontSize: 12, color: active ? '#303133' : '#909399', fontWeight: active ? 600 : 400 }}>{s}</div>
                </div>
              );
            })}
          </div>

          {/* Step 1: Download template */}
          {step === 1 && (
            <div>
              <div style={{ fontSize: 14, color: '#606266', marginBottom: 16, lineHeight: 1.7 }}>
                請先下載標準範本，依照格式填入產品資料後再上傳。<br />
                範本支援多規格（Parent ID 邏輯）與多圖批次上傳。
              </div>
              <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', padding: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>範本說明</div>
                {['產品名稱（必填）、簡述、定價、促銷價', '分類、標籤（多個以逗號分隔）', 'Parent ID：主產品留空，子規格填入主產品 ID', '圖片欄位：填入檔名，搭配 ZIP 圖片包上傳'].map(t => (
                  <div key={t} style={{ fontSize: 12, color: '#606266', padding: '3px 0', display: 'flex', gap: 8 }}>
                    <span style={{ color: '#67C23A' }}>•</span>{t}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={btnDL}>↓ 下載 Excel 範本</button>
                <button style={btnDL}>↓ 下載 CSV 範本</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
                <button style={btnPrimary2} onClick={() => setStep(2)}>下一步 →</button>
              </div>
            </div>
          )}

          {/* Step 2: Upload file */}
          {step === 2 && (
            <div>
              <div style={{ fontSize: 14, color: '#606266', marginBottom: 16 }}>上傳已填妥的 Excel/CSV 檔案。如需批次上傳圖片，請同時上傳 ZIP 圖片包。</div>

              {/* Excel drop zone */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#606266', marginBottom: 6, fontWeight: 600 }}>產品資料檔案 <span style={{ color: '#F56C6C' }}>*</span></div>
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver('excel'); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                  style={{
                    border: `2px dashed ${dragOver === 'excel' ? '#409EFF' : '#DCDFE6'}`,
                    padding: '20px', textAlign: 'center', cursor: 'pointer',
                    background: dragOver === 'excel' ? '#ecf5ff' : '#FAFAFA',
                    transition: 'all 0.15s',
                  }}
                  onClick={() => document.getElementById('excelInput').click()}
                >
                  <input id="excelInput" type="file" accept=".xlsx,.csv" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
                  {file ? (
                    <div style={{ color: '#303133', fontSize: 14 }}>✓ {file.name}</div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 24, color: '#DCDFE6', marginBottom: 8 }}>↑</div>
                      <div style={{ fontSize: 13, color: '#606266' }}>點擊或拖曳上傳 .xlsx / .csv</div>
                    </div>
                  )}
                </div>
              </div>

              {/* ZIP drop zone */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: '#606266', marginBottom: 6, fontWeight: 600 }}>圖片壓縮包（選填）</div>
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver('zip'); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); }}
                  style={{
                    border: `2px dashed ${dragOver === 'zip' ? '#409EFF' : '#DCDFE6'}`,
                    padding: '16px', textAlign: 'center', cursor: 'pointer',
                    background: dragOver === 'zip' ? '#ecf5ff' : '#FAFAFA',
                  }}
                >
                  <div style={{ fontSize: 12, color: '#909399' }}>點擊或拖曳上傳 .zip 圖片包</div>
                </div>
                <div style={{ fontSize: 11, color: '#909399', marginTop: 4 }}>圖片檔名需與 Excel 中的圖片欄位對應</div>
              </div>

              <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
                <button style={btnBack} onClick={() => setStep(1)}>← 上一步</button>
                <button style={{ ...btnPrimary2, opacity: file ? 1 : 0.5 }} onClick={file ? handleUpload : undefined}>開始匯入</button>
              </div>
            </div>
          )}

          {/* Step 3: Processing */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>
                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#303133', marginBottom: 8 }}>正在解析匯入資料…</div>
              <div style={{ fontSize: 13, color: '#909399' }}>系統正在驗證資料格式並建立產品，請稍候</div>
              <div style={{ marginTop: 20, height: 4, background: '#F5F7FA', border: '1px solid #DCDFE6', borderRadius: 0, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: '#303133', width: '60%', animation: 'progress 2.5s ease-out forwards' }} />
              </div>
            </div>
          )}

          {/* Step 4: Result */}
          {step === 4 && (
            <div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                <div style={{ flex: 1, background: '#f0f9eb', border: '1px solid #c2e7b0', padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#67C23A' }}>6</div>
                  <div style={{ fontSize: 12, color: '#606266', marginTop: 4 }}>成功匯入</div>
                </div>
                <div style={{ flex: 1, background: '#fef0f0', border: '1px solid #fbc4c4', padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#F56C6C' }}>{resultErrors.length}</div>
                  <div style={{ fontSize: 12, color: '#606266', marginTop: 4 }}>錯誤筆數</div>
                </div>
                <div style={{ flex: 1, background: '#F5F7FA', border: '1px solid #DCDFE6', padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#303133' }}>8</div>
                  <div style={{ fontSize: 12, color: '#606266', marginTop: 4 }}>總計筆數</div>
                </div>
              </div>

              {resultErrors.length > 0 && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#F56C6C', marginBottom: 8 }}>錯誤明細（此批次未執行，請修正後重新上傳）</div>
                  <div style={{ border: '1px solid #fbc4c4', background: '#fef0f0' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                      <thead>
                        <tr style={{ background: '#fde2e2' }}>
                          {['第幾列', '欄位', '錯誤說明'].map(h => (
                            <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#F56C6C', fontWeight: 600 }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {resultErrors.map((e, i) => (
                          <tr key={i} style={{ borderTop: '1px solid #fbc4c4' }}>
                            <td style={{ padding: '8px 12px', color: '#606266' }}>第 {e.row} 列</td>
                            <td style={{ padding: '8px 12px', color: '#606266' }}>{e.field}</td>
                            <td style={{ padding: '8px 12px', color: '#303133' }}>{e.msg}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 20 }}>
                <button style={btnBack} onClick={() => setStep(1)}>重新上傳</button>
                <button style={btnPrimary2} onClick={() => { showToast('匯入完成，已建立 6 筆產品'); onClose(); }}>完成</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes progress { from { width: 0% } to { width: 75% } }`}</style>
    </ModalOverlay>
  );
}

// ─── AI Upload Modal ─────────────────────────────────────────────────────────
function AIUploadModal({ onClose, showToast }) {
  const [step, setStep] = React.useState(1); // 1=upload, 2=processing, 3=review-img, 4=review-text, 5=done
  const [aiMode, setAIMode] = React.useState({ img: true, desc: true, video: false });
  const [imgType, setImgType] = React.useState('white'); // white | context
  const [processing, setProcessing] = React.useState('');
  const [confirmed, setConfirmed] = React.useState({ img: false, desc: false });
  const [productName, setProductName] = React.useState('');

  const startProcessing = () => {
    setStep(2);
    setProcessing('正在分析上傳圖片…');
    setTimeout(() => setProcessing('AI 去背，生成專業白底圖…'), 1200);
    setTimeout(() => setProcessing('生成產品描述與規格…'), 2400);
    setTimeout(() => setProcessing('產出關鍵字與 Meta 描述…'), 3400);
    setTimeout(() => setStep(3), 4400);
  };

  const aiGenDesc = {
    brief: '採用先進降噪技術，提供清晰通話品質與沉浸式音樂體驗。輕量化設計配合人體工學耳翼，長時間配戴舒適不疲勞。支援多裝置快速切換，智慧感應開關蓋即可連線。',
    specs: '驅動單元：10mm 動圈\n頻率響應：20Hz–20kHz\n藍牙版本：5.3\n續航時間：耳機 8H / 充電盒 32H\n充電介面：USB-C\n防水等級：IPX4',
    keywords: '藍牙耳機、無線耳機、降噪耳機、TWS',
    meta: '高音質無線藍牙耳機，支援主動降噪與多裝置連線，輕量舒適設計，立即享受極致音樂體驗。',
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div style={{ width: 640, background: '#fff', border: '1px solid #DCDFE6', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 24, height: 24, background: 'linear-gradient(135deg, #5B21B6, #EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11 }}>✦</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>AI 智能上架</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#909399', fontSize: 18 }}>×</button>
        </div>

        <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>

          {/* Step 1: Config + Upload */}
          {step === 1 && (
            <div>
              <div style={{ fontSize: 13, color: '#909399', marginBottom: 20, lineHeight: 1.6 }}>
                上傳原始產品圖（手機拍攝亦可），AI 將自動優化圖片、生成文案，協助您快速完成上架。
              </div>

              {/* Product name (MUST be manual) */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>產品名稱 <span style={{ color: '#F56C6C' }}>*</span> <span style={{ fontSize: 11, color: '#909399', fontWeight: 400 }}>（此欄必須由您親自填寫）</span></div>
                <input style={{ ...inputStyle2, width: '100%' }} placeholder="請輸入產品名稱" value={productName} onChange={e => setProductName(e.target.value)} />
              </div>

              {/* Upload zone */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>上傳原始圖片 / 文件 <span style={{ color: '#F56C6C' }}>*</span></div>
                <div style={{ border: '2px dashed #DCDFE6', padding: 32, textAlign: 'center', background: '#FAFAFA', cursor: 'pointer' }}>
                  <div style={{ fontSize: 28, color: '#C0C4CC', marginBottom: 8 }}>↑</div>
                  <div style={{ fontSize: 13, color: '#606266', marginBottom: 4 }}>點擊或拖曳上傳</div>
                  <div style={{ fontSize: 11, color: '#909399' }}>支援 JPG、PNG、WORD、PDF</div>
                </div>
              </div>

              {/* AI Features selection */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>選擇 AI 功能</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { key: 'img', label: 'AI 圖片優化', desc: '自動去背並生成專業白底圖或情境展示圖' },
                    { key: 'desc', label: 'AI 一鍵產品描述', desc: '自動生成簡述、規格、關鍵字與 Meta 描述' },
                    { key: 'video', label: 'AI 3D 展示影片', desc: '依照產品圖生成 7 秒展示影片（消耗較多 Token）' },
                  ].map(f => (
                    <div key={f.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 12, border: `1px solid ${aiMode[f.key] ? '#303133' : '#DCDFE6'}`, background: aiMode[f.key] ? '#F5F7FA' : '#fff', cursor: 'pointer' }}
                      onClick={() => setAIMode(m => ({ ...m, [f.key]: !m[f.key] }))}>
                      <div style={{ width: 18, height: 18, border: `2px solid ${aiMode[f.key] ? '#303133' : '#DCDFE6'}`, background: aiMode[f.key] ? '#303133' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        {aiMode[f.key] && <span style={{ color: '#fff', fontSize: 10, lineHeight: 1 }}>✓</span>}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#303133' }}>{f.label}</div>
                        <div style={{ fontSize: 12, color: '#909399', marginTop: 2 }}>{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image type if img selected */}
              {aiMode.img && (
                <div style={{ marginBottom: 20, padding: 16, background: '#F5F7FA', border: '1px solid #DCDFE6' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10, color: '#606266' }}>圖片優化類型</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[['white', '專業白底圖'], ['context', '情境展示圖'], ['both', '兩者都要']].map(([v, l]) => (
                      <button key={v} onClick={() => setImgType(v)} style={{
                        padding: '6px 14px', border: `1px solid ${imgType === v ? '#303133' : '#DCDFE6'}`,
                        background: imgType === v ? '#303133' : '#fff', color: imgType === v ? '#fff' : '#606266',
                        fontSize: 12, cursor: 'pointer', borderRadius: 0, fontFamily: 'inherit',
                      }}>{l}</button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button style={{ ...btnPrimary2, opacity: productName ? 1 : 0.5, background: 'linear-gradient(135deg, #5B21B6, #EC4899)', border: 'none' }} onClick={productName ? startProcessing : undefined}>
                  ✦ 開始 AI 處理
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Processing */}
          {step === 2 && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ width: 60, height: 60, margin: '0 auto 20px', background: 'linear-gradient(135deg, #5B21B6, #EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>
                <span style={{ display: 'inline-block', animation: 'spin 1.5s linear infinite' }}>✦</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>AI 處理中…</div>
              <div style={{ fontSize: 13, color: '#909399', minHeight: 20 }}>{processing}</div>
              <div style={{ marginTop: 20, height: 4, background: '#F5F7FA', border: '1px solid #DCDFE6', overflow: 'hidden', width: 300, margin: '20px auto 0' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg, #5B21B6, #EC4899)', animation: 'progress 4s ease-out forwards' }} />
              </div>
            </div>
          )}

          {/* Step 3: Review Images */}
          {step === 3 && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>AI 圖片優化結果</div>
              <div style={{ fontSize: 12, color: '#909399', marginBottom: 16 }}>請確認 AI 生成的圖片，滿意後點擊「確認採用」回填至產品欄位</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                {[['原始圖片', '手機拍攝原圖', '#909399'], ['AI 白底圖', 'AI 專業去背白底', '#67C23A']].map(([title, sub, color]) => (
                  <div key={title} style={{ border: '1px solid #DCDFE6' }}>
                    <div style={{ background: '#F5F7FA', padding: '8px 12px', borderBottom: '1px solid #DCDFE6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{title}</span>
                      <span style={{ fontSize: 11, color }}>{sub}</span>
                    </div>
                    <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', background: title === 'AI 白底圖' ? '#fff' : '#F5F7FA', color: '#C0C4CC', fontSize: 13 }}>
                      {title === 'AI 白底圖' ? '[ AI 生成白底圖 ]' : '[ 原始上傳圖片 ]'}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', padding: 12, marginBottom: 16, fontSize: 12, color: '#606266' }}>
                不滿意此結果？點擊「重新生成」將再次消耗 Token。
              </div>

              <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
                <button style={btnBack} onClick={() => { setStep(2); setTimeout(() => setStep(3), 3000); }}>↺ 重新生成</button>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={btnBack} onClick={() => setStep(1)}>取消</button>
                  <button style={btnPrimary2} onClick={() => setStep(4)}>確認採用 →</button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review Text */}
          {step === 4 && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>AI 文案生成結果</div>
              <div style={{ fontSize: 12, color: '#909399', marginBottom: 16 }}>請確認以下內容，確認後將回填至產品對應欄位</div>

              {[
                { label: '產品簡述', value: aiGenDesc.brief, rows: 3 },
                { label: '規格', value: aiGenDesc.specs, rows: 4 },
                { label: '關鍵字', value: aiGenDesc.keywords, rows: 1 },
                { label: 'Meta 描述', value: aiGenDesc.meta, rows: 2 },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#606266', marginBottom: 4 }}>{f.label}</div>
                  <textarea defaultValue={f.value} rows={f.rows} style={{
                    width: '100%', padding: '8px 10px', border: '1px solid #DCDFE6', borderRadius: 0,
                    fontSize: 13, color: '#303133', fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.6,
                  }} />
                </div>
              ))}

              <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', padding: 12, marginBottom: 16, fontSize: 12, color: '#606266' }}>
                不滿意此結果？點擊「重新生成」將再次消耗 Token。
              </div>

              <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
                <button style={btnBack} onClick={() => setStep(3)}>← 上一步</button>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={btnBack} onClick={() => { setStep(2); setTimeout(() => setStep(4), 3000); }}>↺ 重新生成</button>
                  <button style={{ ...btnPrimary2, background: 'linear-gradient(135deg, #5B21B6, #EC4899)', border: 'none' }} onClick={() => setStep(5)}>確認回填至產品 →</button>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Done */}
          {step === 5 && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#f0f9eb', border: '2px solid #c2e7b0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#67C23A', margin: '0 auto 16px' }}>✓</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>AI 處理完成！</div>
              <div style={{ fontSize: 13, color: '#909399', marginBottom: 24, lineHeight: 1.7 }}>
                圖片、文案已回填至產品欄位。<br />請前往產品編輯頁面確認並填寫剩餘必填資料後發布。
              </div>
              <button style={{ ...btnPrimary2, background: 'linear-gradient(135deg, #5B21B6, #EC4899)', border: 'none' }}
                onClick={() => { showToast('已回填，請前往編輯完成發布'); onClose(); }}>前往編輯產品</button>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes progress { from { width: 0% } to { width: 95% } }`}</style>
    </ModalOverlay>
  );
}

// ─── Shared Modal Overlay ────────────────────────────────────────────────────
function ModalOverlay({ children, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 2000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      {children}
    </div>
  );
}

// Shared local button styles
const btnPrimary2 = { height: 32, padding: '0 20px', background: '#303133', color: '#fff', border: '1px solid #303133', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 };
const btnBack = { height: 32, padding: '0 16px', background: '#fff', color: '#606266', border: '1px solid #DCDFE6', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 };
const btnDL = { height: 32, padding: '0 14px', background: '#fff', color: '#409EFF', border: '1px solid #b3d8ff', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 };
const inputStyle2 = { height: 32, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', background: '#fff', outline: 'none' };

Object.assign(window, { BatchUploadModal, AIUploadModal, ModalOverlay });
