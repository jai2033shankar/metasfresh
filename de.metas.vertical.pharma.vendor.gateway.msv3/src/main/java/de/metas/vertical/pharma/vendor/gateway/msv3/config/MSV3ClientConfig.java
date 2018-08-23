package de.metas.vertical.pharma.vendor.gateway.msv3.config;

import java.net.URL;

import de.metas.bpartner.BPartnerId;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.ToString;
import lombok.Value;

/*
 * #%L
 * de.metas.vendor.gateway.msv3
 * %%
 * Copyright (C) 2018 metas GmbH
 * %%
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 2 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public
 * License along with this program. If not, see
 * <http://www.gnu.org/licenses/gpl-2.0.html>.
 * #L%
 */

@Value
@Builder(toBuilder = true)
@ToString(exclude = "authPassword")
public class MSV3ClientConfig
{
	@NonNull
	URL baseUrl;
	@NonNull
	String authUsername;
	@NonNull
	String authPassword;

	@Getter
	@NonNull
	BPartnerId bpartnerId;

	/** might be null, if the MSV3ClientConfig wasn't stored yet */
	@Getter
	MSV3ClientConfigId configId;
}
