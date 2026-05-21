// Screen 6: CSV 批次匯入 Dialog

function CsvImportDialog({ onClose, onSuccess }) {
  const [step, setStep] = React.useState(1);
  const [file, setFile] = React.useState(null);
  const [importMode, setImportMode] = React.useState('add');
  const [dragOver, setDragOver] = React.useState(false);
  const [validating, setValidating] = React.useState(false);
  const [validationResult, setValidationResult] = React.useState(null);
  const [errorExpanded, setErrorExpanded] = React.useState(false);
  const [importing, setImporting] = React.useState(false);

  const SAMPLE_ERRORS = [
    { row: 3, reason: '售價欄位不得為空', name: '夏日連身裙' },
    { row: 7, reason: '分類「男裝 > 外套」不存在，請先在後台建立此分類', name: '防風連帽外套' },
    { row: 12, reason: 'SKU 編號「SKU-T001」已存在，新增模式不允許重複 SKU', name: '棉質T恤' },
    { row: 18, reason: '庫存數量必須為 0 以上的整數', name: '牛仔短褲' },
    { row: 24, reason: '售價必須為數字', name: '運動背心' },
    { row: 31, reason: '產品名稱不得為空', name: '—' },
    { row: 35, reason: '圖片 URL 格式不正確', name: '涼感冰絲上衣' },
  ];

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.name.endsWith('.csv')) {
      alert('請上傳 .csv 格式的檔案');
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert('檔案大小超過 10MB，請分批上傳或壓縮後重試');
      return;
    }
    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFileSelect(dropped);
  };

  const handleValidate = () => {
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
      setValidationResult({ total: 45, valid: 38, errors: SAMPLE_ERRORS });
      setStep(2);
    }, 1800);
  };

  const handleConfirmImport = () => {
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setStep(3);
    }, 1500);
  };

  const stepLabels = ['上傳', '驗證', '完成'];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9997, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @keyframes csvFadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
      <div style={{
        background: '#fff', border: '1px solid #DCDFE6', width: 720, maxHeight: '90vh',
        display: 'flex', flexDirection: 'column',
        animation: 'csvFadeIn 0.25s ease-out',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #DCDFE6' }}>
          <span style={{ fontSize: 16, fontWeight: 600 }}>
            {step === 1 ? '批次匯入產品' : step === 2 ? '驗證結果' : '匯入完成'}
          </span>
          {step === 1 && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#909399' }}>×</button>
          )}
        </div>

        {/* Stepper */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #DCDFE6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
            {stepLabels.map((label, i) => {
              const stepNum = i + 1;
              const isActive = step === stepNum;
              const isDone = step > stepNum;
              return (
                <React.Fragment key={label}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 600,
                      background: isDone ? '#303133' : isActive ? '#303133' : '#DCDFE6',
                      color: isDone || isActive ? '#fff' : '#909399',
                    }}>
                      {isDone ? '✓' : stepNum}
                    </div>
                    <span style={{ fontSize: 12, color: isActive ? '#303133' : '#909399' }}>{label}</span>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div style={{ width: 80, height: 2, background: step > stepNum ? '#303133' : '#DCDFE6', margin: '0 8px', marginBottom: 20 }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {/* Step 1 */}
          {step === 1 && (
            <div>
              {/* Template download */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <button style={plainBtn} onClick={() => {}}>⬇ 下載 CSV 模板</button>
              </div>

              {/* Drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById('csv-file-input').click()}
                style={{
                  border: `2px dashed ${dragOver ? '#409EFF' : file ? '#67C23A' : '#DCDFE6'}`,
                  background: dragOver ? '#ECF5FF' : '#FAFAFA',
                  padding: '48px 24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  marginBottom: 20,
                  transition: 'border-color 0.15s, background 0.15s',
                }}
              >
                <input id="csv-file-input" type="file" accept=".csv" style={{ display: 'none' }}
                  onChange={e => handleFileSelect(e.target.files[0])} />
                {file ? (
                  <div>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#303133', marginBottom: 4 }}>{file.name}</div>
                    <div style={{ fontSize: 13, color: '#909399' }}>{(file.size / 1024).toFixed(1)} KB</div>
                    <button style={{ ...plainBtn, marginTop: 12, fontSize: 12 }} onClick={e => { e.stopPropagation(); setFile(null); }}>重新選擇</button>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: 40, marginBottom: 12, color: '#C0C4CC' }}>☁</div>
                    <div style={{ fontSize: 15, color: '#303133', marginBottom: 4 }}>
                      {dragOver ? '放開即上傳' : '將 CSV 檔案拖放至此，或點擊選擇檔案'}
                    </div>
                    <div style={{ fontSize: 13, color: '#909399' }}>支援 .csv 格式，檔案大小上限 10MB</div>
                  </div>
                )}
              </div>

              {/* Import mode */}
              <div style={{ padding: 20, background: '#F5F7FA', border: '1px solid #DCDFE6', borderRadius: 3 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>匯入模式</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    ['add', '新增模式', '將所有資料作為全新產品新增，SKU 編號重複時會報錯'],
                    ['update', '更新模式', '依 SKU 編號比對，自動新增不存在的產品並更新已存在的產品'],
                  ].map(([val, label, desc]) => (
                    <label key={val} style={{ display: 'flex', gap: 10, cursor: 'pointer', alignItems: 'flex-start' }}>
                      <input type="radio" name="importMode" value={val} checked={importMode === val} onChange={() => setImportMode(val)}
                        style={{ marginTop: 2, accentColor: '#409EFF' }} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: '#303133', marginBottom: 2 }}>{label}</div>
                        <div style={{ fontSize: 13, color: '#909399' }}>{desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Validating */}
          {step === 1 && validating && (
            <div style={{ position: 'absolute', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{ fontSize: 14, color: '#606266' }}>正在驗證資料，請稍候…</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 8, height: 8, background: '#409EFF', borderRadius: '50%', opacity: 0.4 + i * 0.3 }} />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Validation result */}
          {step === 2 && validationResult && (
            <div>
              {/* Summary */}
              <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                <div style={{ flex: 1, padding: 16, background: '#f0f9eb', border: '1px solid #c2e7b0', borderRadius: 3, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>✅</span>
                  <div>
                    <div style={{ fontSize: 13, color: '#67C23A' }}>可匯入</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#67C23A' }}>{validationResult.valid} 筆</div>
                  </div>
                </div>
                <div style={{ flex: 1, padding: 16, background: '#fef0f0', border: '1px solid #fbc4c4', borderRadius: 3, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>❌</span>
                  <div>
                    <div style={{ fontSize: 13, color: '#F56C6C' }}>格式有誤（將略過）</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#F56C6C' }}>{validationResult.errors.length} 筆</div>
                  </div>
                </div>
              </div>

              {/* Error table */}
              {validationResult.errors.length > 0 && (
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>錯誤明細</div>
                  <div style={{ border: '1px solid #DCDFE6', borderRadius: 3 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                      <thead>
                        <tr>
                          {['列號', '產品名稱', '錯誤原因'].map(h => (
                            <th key={h} style={{ ...thStyle, textAlign: 'left', fontSize: 13 }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(errorExpanded ? validationResult.errors : validationResult.errors.slice(0, 5)).map((err, i) => (
                          <tr key={i}
                            onMouseEnter={e => e.currentTarget.style.background = '#F5F7FA'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <td style={{ ...tdStyle, fontSize: 14, width: 60 }}>{err.row}</td>
                            <td style={{ ...tdStyle, fontSize: 14, color: '#303133' }}>{err.name}</td>
                            <td style={{ ...tdStyle, fontSize: 14, color: '#F56C6C' }}>{err.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {validationResult.errors.length > 5 && (
                      <div style={{ padding: '10px 16px', borderTop: '1px solid #DCDFE6', textAlign: 'center' }}>
                        <button style={textBtn('#409EFF')} onClick={() => setErrorExpanded(e => !e)}>
                          {errorExpanded ? '收合' : `展開查看全部 ${validationResult.errors.length} 筆錯誤`}
                        </button>
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <button style={plainBtn} onClick={() => {}}>⬇ 下載錯誤報告（CSV）</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Complete */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#303133', marginBottom: 8 }}>
                成功匯入 {validationResult?.valid || 38} 件產品！
              </div>
              {validationResult?.errors?.length > 0 && (
                <div style={{ fontSize: 14, color: '#909399', marginBottom: 24 }}>
                  另有 {validationResult.errors.length} 筆因格式錯誤已略過，可下載錯誤報告查看詳情。
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #DCDFE6', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          {step === 1 && (
            <>
              <button style={plainBtn} onClick={onClose}>取消</button>
              <button style={{ ...primaryBtn, opacity: !file ? 0.5 : 1 }} disabled={!file || validating} onClick={handleValidate}>
                {validating ? '驗證中…' : '下一步：驗證資料'}
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <button style={plainBtn} onClick={() => setStep(1)}>上一步</button>
              <button style={primaryBtn} disabled={importing} onClick={handleConfirmImport}>
                {importing ? '匯入中…' : validationResult?.errors?.length > 0 ? `確認匯入（跳過 ${validationResult.errors.length} 筆錯誤）` : '確認匯入'}
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <button style={plainBtn} onClick={onClose}>關閉</button>
              <button style={primaryBtn} onClick={() => { onSuccess && onSuccess(validationResult?.valid || 38); }}>查看已匯入產品</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CsvImportDialog });
