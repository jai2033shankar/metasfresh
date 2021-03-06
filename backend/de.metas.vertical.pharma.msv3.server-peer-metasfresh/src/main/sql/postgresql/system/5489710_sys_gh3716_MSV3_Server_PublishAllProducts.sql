-- 2018-03-29T14:53:03.864
-- I forgot to set the DICTIONARY_ID_COMMENTS System Configurator
UPDATE AD_Process SET Value='MSV3_Customer_Config_PublishAll',Updated=TO_TIMESTAMP('2018-03-29 14:53:03','YYYY-MM-DD HH24:MI:SS'),UpdatedBy=100 WHERE AD_Process_ID=540939
;

-- 2018-03-29T16:10:08.004
-- I forgot to set the DICTIONARY_ID_COMMENTS System Configurator
INSERT INTO AD_Table_Process (EntityType,CreatedBy,IsActive,AD_Table_ID,AD_Client_ID,WEBUI_QuickAction,WEBUI_QuickAction_Default,AD_Process_ID,AD_Org_ID,UpdatedBy,Created,Updated) VALUES ('de.metas.vertical.pharma.msv3.server',100,'Y',540956,0,'N','N',540939,0,100,TO_TIMESTAMP('2018-03-29 16:10:08','YYYY-MM-DD HH24:MI:SS'),TO_TIMESTAMP('2018-03-29 16:10:08','YYYY-MM-DD HH24:MI:SS'))
;

-- 2018-03-29T16:11:03.387
-- I forgot to set the DICTIONARY_ID_COMMENTS System Configurator
INSERT INTO AD_Process (AD_Client_ID,IsActive,CreatedBy,IsReport,IsDirectPrint,Value,AccessLevel,EntityType,ShowHelp,IsBetaFunctionality,IsServerProcess,CopyFromProcess,AD_Process_ID,AllowProcessReRun,IsUseBPartnerLanguage,IsApplySecuritySettings,Type,RefreshAllAfterExecution,IsOneInstanceOnly,LockWaitTimeout,AD_Org_ID,Name,Classname,UpdatedBy,Created,Updated) VALUES (0,'Y',100,'N','N','MSV3_Server_PublishAllProducts','7','de.metas.vertical.pharma.msv3.server','Y','N','N','N',540949,'Y','Y','N','Java','N','N',0,0,'Publish all products to MSV3 server','de.metas.vertical.pharma.msv3.server.process.MSV3_Server_PublishAllProducts',100,TO_TIMESTAMP('2018-03-29 16:11:03','YYYY-MM-DD HH24:MI:SS'),TO_TIMESTAMP('2018-03-29 16:11:03','YYYY-MM-DD HH24:MI:SS'))
;

-- 2018-03-29T16:11:03.390
-- I forgot to set the DICTIONARY_ID_COMMENTS System Configurator
INSERT INTO AD_Process_Trl (AD_Language,AD_Process_ID, Help,Description,Name, IsTranslated,AD_Client_ID,AD_Org_ID,Created,Createdby,Updated,UpdatedBy) SELECT l.AD_Language,t.AD_Process_ID, t.Help,t.Description,t.Name, 'N',t.AD_Client_ID,t.AD_Org_ID,t.Created,t.Createdby,t.Updated,t.UpdatedBy FROM AD_Language l, AD_Process t WHERE l.IsActive='Y' AND l.IsSystemLanguage='Y' AND l.IsBaseLanguage='N' AND t.AD_Process_ID=540949 AND NOT EXISTS (SELECT 1 FROM AD_Process_Trl tt WHERE tt.AD_Language=l.AD_Language AND tt.AD_Process_ID=t.AD_Process_ID)
;

-- 2018-03-29T16:11:25.523
-- I forgot to set the DICTIONARY_ID_COMMENTS System Configurator
INSERT INTO AD_Table_Process (EntityType,CreatedBy,IsActive,AD_Table_ID,AD_Client_ID,WEBUI_QuickAction,WEBUI_QuickAction_Default,AD_Process_ID,AD_Org_ID,UpdatedBy,Created,Updated) VALUES ('de.metas.vertical.pharma.msv3.server',100,'Y',540956,0,'N','N',540949,0,100,TO_TIMESTAMP('2018-03-29 16:11:25','YYYY-MM-DD HH24:MI:SS'),TO_TIMESTAMP('2018-03-29 16:11:25','YYYY-MM-DD HH24:MI:SS'))
;

-- 2018-03-29T16:11:49.905
-- I forgot to set the DICTIONARY_ID_COMMENTS System Configurator
UPDATE AD_Process SET Name='Publish all users to MSV3 server',Updated=TO_TIMESTAMP('2018-03-29 16:11:49','YYYY-MM-DD HH24:MI:SS'),UpdatedBy=100 WHERE AD_Process_ID=540939
;

