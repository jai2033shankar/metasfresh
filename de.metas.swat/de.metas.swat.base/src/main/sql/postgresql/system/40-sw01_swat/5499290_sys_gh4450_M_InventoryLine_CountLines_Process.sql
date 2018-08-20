-- 2018-08-14T10:14:41.954
-- I forgot to set the DICTIONARY_ID_COMMENTS System Configurator
INSERT INTO AD_Process (AccessLevel,AD_Client_ID,AD_Org_ID,AD_Process_ID,AllowProcessReRun,Classname,CopyFromProcess,Created,CreatedBy,EntityType,IsActive,IsApplySecuritySettings,IsBetaFunctionality,IsDirectPrint,IsOneInstanceOnly,IsReport,IsServerProcess,IsUseBPartnerLanguage,LockWaitTimeout,Name,RefreshAllAfterExecution,ShowHelp,Type,Updated,UpdatedBy,Value) VALUES ('3',0,0,540995,'Y','de.metas.inventory.process.M_InventoryLine_MarkAsCounted','N',TO_TIMESTAMP('2018-08-14 10:14:41','YYYY-MM-DD HH24:MI:SS'),100,'de.metas.swat','Y','N','N','N','N','N','N','Y',0,'Ausgewählte Zeilen als gezählt markieren','N','Y','Java',TO_TIMESTAMP('2018-08-14 10:14:41','YYYY-MM-DD HH24:MI:SS'),100,'M_InventoryLine_MarkAsCounted')
;

-- 2018-08-14T10:14:41.961
-- I forgot to set the DICTIONARY_ID_COMMENTS System Configurator
INSERT INTO AD_Process_Trl (AD_Language,AD_Process_ID, Description,Help,Name, IsTranslated,AD_Client_ID,AD_Org_ID,Created,Createdby,Updated,UpdatedBy) SELECT l.AD_Language,t.AD_Process_ID, t.Description,t.Help,t.Name, 'N',t.AD_Client_ID,t.AD_Org_ID,t.Created,t.Createdby,t.Updated,t.UpdatedBy FROM AD_Language l, AD_Process t WHERE l.IsActive='Y' AND l.IsSystemLanguage='Y' AND l.IsBaseLanguage='N' AND t.AD_Process_ID=540995 AND NOT EXISTS (SELECT 1 FROM AD_Process_Trl tt WHERE tt.AD_Language=l.AD_Language AND tt.AD_Process_ID=t.AD_Process_ID)
;

-- 2018-08-14T10:15:04.206
-- I forgot to set the DICTIONARY_ID_COMMENTS System Configurator
UPDATE AD_Process_Trl SET IsTranslated='Y',Name='Mark Inventory Lines as Counted' WHERE AD_Process_ID=540995 AND AD_Language='en_US'
;

-- 2018-08-14T10:16:42.460
-- I forgot to set the DICTIONARY_ID_COMMENTS System Configurator
INSERT INTO AD_Table_Process (AD_Client_ID,AD_Org_ID,AD_Process_ID,AD_Table_ID,AD_Window_ID,Created,CreatedBy,EntityType,IsActive,Updated,UpdatedBy,WEBUI_QuickAction,WEBUI_QuickAction_Default) VALUES (0,0,540995,322,540458,TO_TIMESTAMP('2018-08-14 10:16:42','YYYY-MM-DD HH24:MI:SS'),100,'de.metas.swat','Y',TO_TIMESTAMP('2018-08-14 10:16:42','YYYY-MM-DD HH24:MI:SS'),100,'N','N')
;

